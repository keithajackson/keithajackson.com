# $@ allows us to add params, like --fix, if we want
./node_modules/.bin/eslint -c ./.eslintrc src $@
