install:
	npm ci

lint:
	npx eslint .

gendiff:
	bin/gendiff.js

publish:
	npm publish --dry-run