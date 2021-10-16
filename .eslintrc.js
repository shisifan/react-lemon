module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'semi': 0,
        'indent': 0,
        'no-shadow': 0,
        'react/jsx-filename-extension': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'no-use-before-define': 0,
        'no-unused-vars': 0,
        'implicit-arrow-linebreak': 0,
        'consistent-return': 0,
        'arrow-parens': 0,
        'object-curly-newline': 0,
        'operator-linebreak': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
    }
};
