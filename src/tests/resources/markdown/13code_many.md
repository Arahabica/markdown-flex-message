```typescript
import Prism from 'prismjs';

// add two integers
function add(a: number, b: number) {
  return a + b;
}

function foo() {
  const foo = "foo";
  const bar = "bar";
  return foo + bar;
}

function isBig(num: number) {
  if (num > 10000) {
    return true;
  }
  return false;
}

function isTel(text: string) {
  const regex = /^\d{3}-\d{4}-\d{4}$/;
  return regex.test(text);
}
```

```markdown
# Markdown

*italic*
**bold**
~~deleted~~

[X](https://x.com)
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<content:encoded>
  <![CDATA[
    <p>ある日の暮方の事である。一人の下人が、羅生門の下で雨やみを待っていた。</p>
  ]]>
</content:encoded>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hello html</title>
  <style>
    .root {
      background-color: red;
    }
  </style>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

```scss
$variable: value 1;

.rule-1 {
  color: $variable;
}

.hello + span {
  color: red;
}
.hidden {
  display: none !important;
}
```

```java
package jp.co.xxx;
import example.hogehoge;
```

```ruby
var1 = hoge: :fuga
```
