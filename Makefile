install:
	install-deps

run:
	npx babel-node 'src/bin/index.js'

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test


