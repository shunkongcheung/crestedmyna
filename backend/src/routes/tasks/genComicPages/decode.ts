// copy from site source code
function fromSrc(p: any, a: any, c: any, k: any, e: any, d: any) {
  e = function(c: any) {
    return (
      (c < a ? "" : e(parseInt((c / a) as any))) +
      ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    );
  };
  if (!"".replace(/^/, String)) {
    while (c--) {
      d[e(c)] = k[c] || e(c);
    }
    k = [
      function(e: any) {
        return d[e];
      }
    ];
    e = function() {
      return "\\w+";
    };
    c = 1;
  }
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    }
  }
  return p;
}

function decode(a, b, c, d, e, f) {
  const k = a.replace(/(?:\\(.))/g, "$1");
  const data = fromSrc(k, b, c, d, e, f);
  const decoded = JSON.parse(`[${data.split("[")[1].split("]")[0]}]`);
  return decoded.map((itm: string) => itm.replace(/'/g, ""));
}

export default decode;
