var keys = [
  "ether",
  "inet",
  "inet6",
  "prefixlen",
  "netmask",
  "scopeid",
  "nd6",
  "options",
  "broadcast",
  "media:",
  "status:",
  "member:",
  "id",
  "priority",
  "hellotime",
  "fwddelay",
  "maxage",
  "holdcnt",
  "proto",
  "maxaddr",
  "timeout",
  "ipfilter",
  "ifmaxaddr",
  "flags",
  "txqueuelen"
];

function parse(src) {
  var lines = src.split("\n");
  var blocks = [];
  var temp = [];
  var ret = {};
  lines.forEach(function(item) {
    if (["\t", " "].indexOf(item[0]) === -1 && temp.length > 0) {
      blocks.push(temp);
      temp = [];
    }
    if (item) {
      temp.push(item);
    }
  });

  blocks.forEach(function(block) {
    var firstline = block[0].toString();
    var coionIdx = firstline.indexOf(":");
    var name = firstline.slice(0, coionIdx);
    var conf = block.slice(1);
    var flagsline = firstline.slice(coionIdx + 1).trim();
    var flagsMh = flagsline.match(
      /^flags=[0-9]+<{1}([A-Z,]*)>{1}\s*mtu\s*([0-9]+)/
    );

    ret[name] = {};
    ret[name].flags = flagsMh[1].split(",");
    ret[name].mtu = parseInt(flagsMh[2], 10);

    conf.forEach(function(item) {
      var list = item.split(" ").filter(function(item) {
        return item.length > 0;
      });
      var key = null;
      for (var i = 0; i < list.length; i++) {
        if (keys.indexOf(list[i] + "") !== -1) {
          key = (list[i] + "").replace(":", "");
          continue;
        }
        if (key) {
          if (!ret[name][key]) ret[name][key] = list[i].toString();
        }
      }
    });

    if (ret[name].flags.length && !ret[name].flags[0].length) {
      ret[name].flags = [];
    }
  });
  return ret;
}

exports.parse = parse;
