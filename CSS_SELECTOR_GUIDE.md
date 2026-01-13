# CSS Selector Guide for Cypress Testing

## Priority Order (Best to Worst)

### 1. **data-* Attributes** (BEST) ⭐
```javascript
cy.get('[data-cy="submit-button"]')
cy.get('[data-test="login-form"]')
cy.get('[data-testid="user-profile"]')
```
**Why:** Test-specific, won't break if styling changes

### 2. **ID Selectors**
```javascript
cy.get('#username')
cy.get('#submit-btn')
```
**Why:** Unique, fast, but may change with refactoring

### 3. **Class Selectors**
```javascript
cy.get('.btn-primary')
cy.get('.form-control')
```
**Why:** Common, but classes often change with styling

### 4. **Attribute Selectors**
```javascript
cy.get('[type="email"]')
cy.get('[name="password"]')
cy.get('[placeholder="Enter username"]')
cy.get('[aria-label="Close"]')
```
**Why:** Semantic, but not test-specific

### 5. **Tag Selectors** (Use with caution)
```javascript
cy.get('button')
cy.get('input')
```
**Why:** Too generic, use with additional qualifiers

## CSS Selector Syntax Rules

### Basic Selectors
```javascript
// Element selector
cy.get('button')

// Class selector
cy.get('.submit-btn')

// ID selector
cy.get('#login-form')

// Attribute selector
cy.get('[type="text"]')
```

### Combinators
```javascript
// Descendant (space)
cy.get('form input')  // All inputs inside form

// Child (>)
cy.get('form > input')  // Direct children only

// Adjacent sibling (+)
cy.get('label + input')  // Input immediately after label

// General sibling (~)
cy.get('h2 ~ p')  // All p elements after h2
```

### Multiple Conditions
```javascript
// Element with class
cy.get('button.primary')

// Element with multiple classes
cy.get('.btn.btn-primary.active')

// Element with attribute
cy.get('input[type="email"]')

// Multiple attributes
cy.get('input[type="text"][name="username"]')
```

### Pseudo-Classes
```javascript
// First/Last child
cy.get('li:first-child')
cy.get('li:last-child')

// Nth child
cy.get('tr:nth-child(2)')
cy.get('tr:nth-child(odd)')
cy.get('tr:nth-child(even)')

// Contains text
cy.contains('Submit')
cy.contains('button', 'Submit')

// Enabled/Disabled
cy.get('input:enabled')
cy.get('button:disabled')

// Checked
cy.get('input:checked')

// Visible
cy.get('div:visible')
```

### Complex Selectors
```javascript
// Multiple selectors (OR)
cy.get('button, a')

// Not selector
cy.get('input:not([type="hidden"])')

// Has selector
cy.get('div:has(> img)')
```

## Cypress-Specific Best Practices

### 1. Use `.contains()` for text
```javascript
// Good
cy.contains('Sign Up').click()
cy.contains('button', 'Sign Up').click()

// Avoid
cy.get('button').contains('Sign Up')
```

### 2. Chain commands
```javascript
// Good
cy.get('[data-cy="form"]')
  .find('input[name="email"]')
  .type('test@example.com')
```

### 3. Use `.within()` for scoping
```javascript
cy.get('[data-cy="login-form"]').within(() => {
  cy.get('[name="username"]').type('user')
  cy.get('[name="password"]').type('pass')
})
```

### 4. Avoid brittle selectors
```javascript
// ❌ Bad (brittle)
cy.get('body > div > div > form > div:nth-child(2) > input')

// ✅ Good (resilient)
cy.get('[data-cy="email-input"]')
cy.get('form input[name="email"]')
```

## Common Patterns

### Forms
```javascript
cy.get('form[name="login"]')
cy.get('input[name="username"]')
cy.get('select[name="country"]')
cy.get('textarea[name="message"]')
cy.get('button[type="submit"]')
```

### Tables
```javascript
cy.get('table tbody tr')
cy.get('table thead th')
cy.get('table tbody tr:first-child td')
cy.get('table tr').eq(1)
```

### Navigation
```javascript
cy.get('nav a[href="/home"]')
cy.get('.navbar .nav-item')
cy.get('header button[aria-label="Menu"]')
```

### Dynamic Elements
```javascript
// Wait for element
cy.get('[data-cy="results"]', { timeout: 10000 })

// Element with dynamic ID
cy.get('[id^="user-"]')  // Starts with
cy.get('[id$="-profile"]')  // Ends with
cy.get('[id*="user"]')  // Contains
```

## Special Characters Escape

```javascript
// Escape special characters with \\
cy.get('[id="my\\:id"]')
cy.get('[class="my\\.class"]')
```

## Performance Tips

1. **Be specific** - More specific = faster
2. **Avoid deep nesting** - Keep selectors short
3. **Use data attributes** - Fastest and most reliable
4. **Cache selectors** - Use aliases
   ```javascript
   cy.get('[data-cy="form"]').as('loginForm')
   cy.get('@loginForm').find('input')
   ```

## Quick Reference Card

| Selector | Example | Use Case |
|----------|---------|----------|
| `[data-cy]` | `[data-cy="btn"]` | ⭐ Best for testing |
| `#id` | `#username` | Unique elements |
| `.class` | `.btn-primary` | Styled elements |
| `[attribute]` | `[type="text"]` | Semantic selection |
| `element` | `button` | Generic elements |
| `:nth-child()` | `tr:nth-child(2)` | Position-based |
| `:contains()` | `contains('text')` | Text-based |
| `>` | `form > input` | Direct children |
| `+` | `label + input` | Next sibling |

## Remember
- **Stability > Brevity** - Prefer longer stable selectors over short brittle ones
- **Test-specific attributes** - Always use `data-*` when possible
- **Avoid implementation details** - Don't rely on CSS classes that might change
