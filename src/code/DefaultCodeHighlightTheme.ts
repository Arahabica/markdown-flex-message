import { CodeHighlightTheme, CodeToken, CodeTokenStyle } from "../types"

export class DefaultCodeHighlightTheme implements CodeHighlightTheme {
  public readonly titleBackgroundColor = "#343548"
  public readonly titleTextColor = "#d9d9d8"
  public readonly codeBackgroundColor = "#272822"
  public readonly codeTextColor = "#f8f8f2"

  highlight(code: CodeToken): CodeTokenStyle {
    switch (code.type) {
    case "keyword":
      return {
        color: "#66d9ef"
      }
    case "number":
      return {
        color: "#ae81ff"
      }
    case "function":
      return {
        color: "#e6db74"
      }
    case "string":
      return {
        color: "#a6e22e"
      }
    case "boolean":
      return {
        color: "#ae81ff"
      }
    case "operator":
      return {
        color: "#f8f8f2"
      }
    case "punctuation":
      return {
        color: "#f8f8f2"
      }
    case "atrule":
      return {
        color: "#e6db74"
      }
    case "url":
      return {
        color: "#f8f8f2"
      }
    case "selector":
      return {
        color: "#a6e22e"
      }
    case "property":
      return {
        color: "#f92672"
      }
    case "important":
      return {
        color: "#fd971f"
      }
    case "style":
      return {
        color: "#f8f8f2"
      }
    case "comment":
      return {
        color: "#8292a2"
      }
    case "class-name":
      return {
        color: "#e6db74"
      }
    case "doctype":
      return {
        color: "#8292a2"
      }
    case "prolog":
      return {
        color: "#8292a2"
      }
    case "cdata":
      return {
        color: "#8292a2"
      }
    case "namespace":
      return {
        opacity: 0.7,
        color: this.codeTextColor
      }
    case "regex":
      return {
        color: "#fd971f"
      }
    case "tag":
      return {
        color: "#f92672"
      }
    case "attr-name":
      return {
        color: "#a6e22e"
      }
    case "attr-value":
      return {
        color: "#a6e22e"
      }
    case "char":
      return {
        color: "#a6e22e"
      }
    case "inserted":
      return {
        color: "#a6e22e"
      }
    case "entity":
      return {}
    case "bold":
      return {
        fontWeight: "bold"
      }
    case "italic":
      return {
        fontStyle: "italic"
      }
    case "deleted":
      return {
        color: "#f92672"
      }
    case "symbol":
      return {
        color: "#f92672"
      }
    case "variable":
      return {
        color: "#f8f8f2"
      }
    case "other":
      return {}
    default:
      return {}
    }
  }
}
