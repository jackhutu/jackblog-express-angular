TESTS = $(shell find test_mocha -type f -name "*.test.js")
TEST_TIMEOUT = 5000

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		-r should \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)
	
test-cov cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover --preserve-comments \
		./node_modules/.bin/_mocha \
		-- \
		-r should \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)
	
.PHONY: test cov test-cov
			