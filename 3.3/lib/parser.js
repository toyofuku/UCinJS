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
    __consume__choose: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["choose"] = this._nodeCache["choose"] || {};
      var cached = this._nodeCache["choose"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__concatenate_or_empty();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.first = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "|") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("|", this._offset, []);
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
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"|\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this.__consume__choose();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.rest = address3;
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
        var type1 = find(this.constructor, "ChooseNode");
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
        address0 = this.__consume__concatenate_or_empty();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["choose"][index0] = address0;
    },
    __consume__concatenate_or_empty: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["concatenate_or_empty"] = this._nodeCache["concatenate_or_empty"] || {};
      var cached = this._nodeCache["concatenate_or_empty"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__concatenate();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__empty();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["concatenate_or_empty"][index0] = address0;
    },
    __consume__concatenate: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["concatenate"] = this._nodeCache["concatenate"] || {};
      var cached = this._nodeCache["concatenate"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__repeat();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.first = address1;
        var address2 = null;
        address2 = this.__consume__concatenate();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.rest = address2;
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
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "ConcatenateNode");
        address0 = new klass0(text0, this._offset, elements0, labelled0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__repeat();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["concatenate"][index0] = address0;
    },
    __consume__empty: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["empty"] = this._nodeCache["empty"] || {};
      var cached = this._nodeCache["empty"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 0);
      } else {
        slice0 = null;
      }
      if (slice0 === "") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "EmptyNode");
        address0 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 0;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
        }
      }
      return this._nodeCache["empty"][index0] = address0;
    },
    __consume__repeat: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat"] = this._nodeCache["repeat"] || {};
      var cached = this._nodeCache["repeat"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__brackets();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.brackets = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "*") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("*", this._offset, []);
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
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"*\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
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
        var type1 = find(this.constructor, "RepeatNode");
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
        address0 = this.__consume__brackets();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["repeat"][index0] = address0;
    },
    __consume__brackets: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["brackets"] = this._nodeCache["brackets"] || {};
      var cached = this._nodeCache["brackets"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("(", this._offset, []);
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
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"(\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__choose();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.choose = address2;
          var address3 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === ")") {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(")", this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\")\""};
            }
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
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
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "BracketsNode");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__literal();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["brackets"][index0] = address0;
    },
    __consume__literal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["literal"] = this._nodeCache["literal"] || {};
      var cached = this._nodeCache["literal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[a-z]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "LiteralNode");
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
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
      return this._nodeCache["literal"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__choose();
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
    Parser = Grammar;
    ParserParser = Parser;
    ParserParser.formatError = formatError;
  }
})();

