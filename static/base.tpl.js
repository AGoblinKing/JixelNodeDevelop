$.template("button", '<img src="${img}" title="${title}" class="toolButton"/>');
$.template("base", '<div {{each(key, val) attri}}${key}="${val}"{{/each}}></div>');
$.template("input", '<label for="${title}">${title}</label><input {{each(key, val) attri}}${key}="${val}"{{/each}}/>');
