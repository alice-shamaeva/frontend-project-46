install:
	npm ci

lint:
	npx eslint .

gendiff:
	bin/.js

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm run test