install:
	npm install

run:
	npx babel-node 'src/bin/index.js'

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test


