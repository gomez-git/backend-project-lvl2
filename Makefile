install: # Install dependencies
	npm ci

test: # Run tests
	npm test -s

test-watch: # Run tests with watch
	npm test -s -- --watch

lint: # Run linter
	npx eslint .

publish: # Publish npm package
	npm publish --dry-run
