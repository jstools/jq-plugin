# --- jq-plugin

build:
	@node make build

install:
	npm install
	@node make build

test:
	node make build
	@$(shell npm bin)/karma start karma.conf.js

increaseVersion:
	node make pkg:increaseVersion

git.increaseVersion: increaseVersion
	git commit -a -n -m "increased version [$(shell node make pkg:version)]"
	@git push origin master
	@echo "\n\trelease version: $(shell node make pkg:version)\n"

release: build git.increaseVersion

version:
	@echo "\n\tcurrent version: $(shell node make pkg:version)\n"

# DEFAULT TASKS

.DEFAULT_GOAL := build
