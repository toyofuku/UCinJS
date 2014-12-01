(function() {
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__statement: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["statement"] = this._nodeCache["statement"] || {};
      var cached = this._nodeCache["statement"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__while();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__assign();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["statement"][index0] = address0;
    },
    __consume__while: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["while"] = this._nodeCache["while"] || {};
      var cached = this._nodeCache["while"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 7);
      } else {
        slice0 = null;
      }
      if (slice0 === "while (") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("while (", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 7;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"while (\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__expression();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.condition = address2;
          var address3 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 4);
          } else {
            slice2 = null;
          }
          if (slice2 === ") { ") {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(") { ", this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 4;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\") { \""};
            }
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            var address4 = null;
            address4 = this.__consume__statement();
            if (address4) {
              elements0.push(address4);
              text0 += address4.textValue;
              labelled0.body = address4;
              var address5 = null;
              var slice4 = null;
              if (this._input.length > this._offset) {
                slice4 = this._input.substring(this._offset, this._offset + 2);
              } else {
                slice4 = null;
              }
              if (slice4 === " }") {
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address5 = new klass2(" }", this._offset, []);
                if (typeof type2 === "object") {
                  extend(address5, type2);
                }
                this._offset += 2;
              } else {
                address5 = null;
                var slice5 = null;
                if (this._input.length > this._offset) {
                  slice5 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice5 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\" }\""};
                }
              }
              if (address5) {
                elements0.push(address5);
                text0 += address5.textValue;
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "WhileNode");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["while"][index0] = address0;
    },
    __consume__assign: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["assign"] = this._nodeCache["assign"] || {};
      var cached = this._nodeCache["assign"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address2 = true;
      while (address2) {
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 && /^[a-z]/.test(slice0)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0(slice0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-z]"};
          }
        }
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address1 = new klass1(text1, this._offset, elements1);
        if (typeof type1 === "object") {
          extend(address1, type1);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.name = address1;
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 3);
        } else {
          slice2 = null;
        }
        if (slice2 === " = ") {
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address3 = new klass2(" = ", this._offset, []);
          if (typeof type2 === "object") {
            extend(address3, type2);
          }
          this._offset += 3;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\" = \""};
          }
        }
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          var address4 = null;
          address4 = this.__consume__expression();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.expression = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "AssignNode");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["assign"][index0] = address0;
    },
    __consume__expression: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["expression"] = this._nodeCache["expression"] || {};
      var cached = this._nodeCache["expression"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      address0 = this.__consume__less_than();
      return this._nodeCache["expression"][index0] = address0;
    },
    __consume__less_than: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["less_than"] = this._nodeCache["less_than"] || {};
      var cached = this._nodeCache["less_than"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__multiply();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.left = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 3);
        } else {
          slice0 = null;
        }
        if (slice0 === " < ") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0(" < ", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 3;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\" < \""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this.__consume__less_than();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.right = address3;
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "LessThanNode");
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__multiply();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["less_than"][index0] = address0;
    },
    __consume__multiply: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["multiply"] = this._nodeCache["multiply"] || {};
      var cached = this._nodeCache["multiply"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__term();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.left = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 3);
        } else {
          slice0 = null;
        }
        if (slice0 === " * ") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0(" * ", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 3;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\" * \""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this.__consume__multiply();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.right = address3;
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "MultiplyNode");
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__term();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["multiply"][index0] = address0;
    },
    __consume__term: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["term"] = this._nodeCache["term"] || {};
      var cached = this._nodeCache["term"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__number();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__variable();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["term"][index0] = address0;
    },
    __consume__number: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["number"] = this._nodeCache["number"] || {};
      var cached = this._nodeCache["number"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 && /^[0-9]/.test(slice0)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address1 = new klass0(slice0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address1, type0);
          }
          this._offset += 1;
        } else {
          address1 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "NumberNode");
        address0 = new klass1(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["number"][index0] = address0;
    },
    __consume__variable: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["variable"] = this._nodeCache["variable"] || {};
      var cached = this._nodeCache["variable"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 && /^[a-z]/.test(slice0)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address1 = new klass0(slice0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address1, type0);
          }
          this._offset += 1;
        } else {
          address1 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-z]"};
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "VariableNode");
        address0 = new klass1(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["variable"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__statement();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
  } else {
    var namespace = this;
    Simple = Grammar;
    SimpleParser = Parser;
    SimpleParser.formatError = formatError;
  }
})();

