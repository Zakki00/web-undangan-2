/* Daftar aset (file di folder assets/) */
var A = {
  wayang: "assets/wayang.svg",
  atas: "assets/atas.webp",
  bawah: "assets/bawah.webp",
  hiasan: "assets/hiasan.webp",
  berlian: "assets/berlian.webp",
  pria: "assets/pria.webp",
  wanita: "assets/wanita.webp",
  d1: "assets/d1.svg",
  d2: "assets/d2.svg",
  d3: "assets/d3.svg",
  d4: "assets/d4.svg",
  d5: "assets/d5.svg",
  d6: "assets/d6.svg",
  d7: "assets/d7.svg",
  d8: "assets/d8.svg",
  d9: "assets/d9.svg",
};
document.querySelectorAll("[data-a]").forEach(function (e) {
  e.src = A[e.dataset.a];
});
(function () {
  var L = [].slice.call(document.querySelectorAll(".leaf")),
    N = L.length,
    cur = 0,
    busy = false,
    T = 1200,
    entered = false,
    swapping = false,
    closing = false,
    quick = false;
  var dots = document.getElementById("dots"),
    pv = document.getElementById("pv"),
    nx = document.getElementById("nx");
  L.forEach(function (leaf, index) {
    leaf.style.zIndex = N - index;
    dots.appendChild(document.createElement("i"));
  });
  try {
    var n = new URLSearchParams(location.search).get("to");
    if (n) {
      n = n.slice(0, 60);
      document.getElementById("tamu").textContent = n;
      document.getElementById("tamu2").textContent = n;
      document.getElementById("gst").hidden = false;
    }
  } catch (e) {}
  function ui() {
    document.body.classList.toggle("open", cur > 0);
    [].forEach.call(dots.children, function (d, i) {
      d.className = i === cur ? "on" : "";
    });
    pv.disabled = cur === 0;
    nx.disabled = cur === N - 1;
  }
  function step(d, force) {
    if (busy || !entered || (closing && !force)) return false;
    var i = d > 0 ? cur : cur - 1;
    if (i < 0 || i >= N - 1) return false;
    var l = L[i];
    busy = true;
    l.style.zIndex = 100;
    l.classList.toggle("flip", d > 0);
    cur += d;
    ui();
    sfx();
    /* Mode cepat (menutup semua halaman): halaman berikutnya boleh mulai sebelum yang sebelumnya selesai */
    setTimeout(
      function () {
        l.style.zIndex = d > 0 ? i + 1 : N - i;
      },
      quick ? 450 : T,
    );
    setTimeout(
      function () {
        busy = false;
      },
      quick ? 110 : T,
    );
    return true;
  }
  /* Lompat ke halaman t; arah dihitung ulang tiap langkah */
  function go(t, done) {
    (function run() {
      if (cur === t) {
        if (!done) return;
        if (busy) return setTimeout(run, 100);
        return done();
      }
      if (!entered) return;
      if (busy) return setTimeout(run, quick ? 30 : 100);
      if (step(t > cur ? 1 : -1, true)) setTimeout(run, quick ? 120 : 260);
    })();
  }
  nx.onclick = function () {
    step(1);
  };
  pv.onclick = function () {
    step(-1);
  };
  [].forEach.call(dots.children, function (d, i) {
    d.onclick = function () {
      if (cur > 0 || i > 0) go(i);
    };
  });
  document.addEventListener("keydown", function (e) {
    if (!entered) {
      if (e.key === "ArrowLeft") toggle("l");
      if (e.key === "ArrowRight") toggle("r");
      return;
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") step(1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") step(-1);
  });
  var sx = 0,
    sy = 0;
  document.addEventListener(
    "touchstart",
    function (e) {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    function (e) {
      var dx = e.changedTouches[0].clientX - sx,
        dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
        step(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
  document.addEventListener(
    "wheel",
    function (e) {
      var s = e.target.closest && e.target.closest(".in");
      if (s && s.scrollHeight > s.clientHeight + 2) return;
      if (Math.abs(e.deltaY) > 30) step(e.deltaY > 0 ? 1 : -1);
    },
    { passive: true },
  );
  var target = new Date("2029-05-25T08:00:00+07:00").getTime();
  function pad(x) {
    return x < 10 ? "0" + x : "" + x;
  }
  function set(id, value) {
    document.getElementById(id).textContent = value;
  }
  function tick() {
    var x = Math.max(0, Math.floor((target - Date.now()) / 1000));
    set("d", Math.floor(x / 86400));
    set("h", pad(Math.floor((x % 86400) / 3600)));
    set("m", pad(Math.floor((x % 3600) / 60)));
    set("s", pad(x % 60));
  }
  tick();
  setInterval(tick, 1000);
  ui();
  var doors = document.getElementById("doors"),
    opening = document.getElementById("opening"),
    shO = document.getElementById("shO"),
    opwrap = document.getElementById("opwrap"),
    bookEl = document.getElementById("book"),
    bkBtn = document.getElementById("bk"),
    lanjut = document.getElementById("lanjut"),
    stageEl = document.querySelector(".stage"),
    ready = false;
  var q =
    window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches
      ? 0.05
      : 1;
  var opened = { l: false, r: false };
  var btn = {
    l: { f: document.getElementById("aL"), b: document.getElementById("bL") },
    r: { f: document.getElementById("aR"), b: document.getElementById("bR") },
  };
  /* Buka atau tutup satu pintu. Kartu ucapan baru bisa dipakai saat kedua pintu terbuka */
  function toggle(side, force) {
    if (!ready || ((entered || swapping) && !force)) return;
    var on = (opened[side] = !opened[side]),
      door = doors.querySelector(".door." + side);
    var had = door.contains(document.activeElement);
    doors.classList.toggle("open" + side.toUpperCase(), on);
    door.querySelector(".df").inert = on;
    door.querySelector(".db").inert = !on;
    if (had) (on ? btn[side].b : btn[side].f).focus({ preventScroll: true });
    if (on) {
      doors.classList.remove("bloom");
      void doors.offsetWidth;
      doors.classList.add("bloom");
    }
    opwrap.inert = !(opened.l && opened.r);
  }
  /* Panah aktif setelah gambar sampul, pintu, kartu ucapan, dan font selesai dimuat */
  function unlock() {
    if (ready) return;
    ready = true;
    btn.l.f.disabled = false;
    btn.r.f.disabled = false;
  }
  var imgs = [].slice
    .call(doors.querySelectorAll("img[data-a]"))
    .concat([].slice.call(L[0].querySelectorAll("img[data-a]")))
    .concat([].slice.call(opening.querySelectorAll("img[data-a]")));
  var jobs = imgs.map(function (im) {
    return new Promise(function (ok) {
      if (im.complete) {
        ok();
      } else {
        im.addEventListener("load", ok);
        im.addEventListener("error", ok);
      }
    });
  });
  jobs.push(
    document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve(),
  );
  Promise.all(jobs).then(unlock);
  setTimeout(unlock, 4000);
  ["l", "r"].forEach(function (s) {
    btn[s].f.addEventListener("click", function () {
      toggle(s);
    });
    btn[s].b.addEventListener("click", function () {
      toggle(s);
    });
  });

  /* Tutup kedua pintu dengan cepat */
  function closeDoors() {
    doors.classList.add("fast");
    ["l", "r"].forEach(function (s) {
      if (opened[s]) toggle(s, true);
    });
  }
  /* Tukar surat: yang depan menutup pintu/halaman lalu meluncur ke belakang, yang belakang maju */
  function swap() {
    if (swapping || closing || !ready) return;
    /* Buku sedang terbuka: tutup semua halaman dulu, baru pindah ke surat ucapan */
    if (entered && (cur > 0 || busy)) {
      closing = true;
      quick = true;
      bookEl.classList.add("quick");
      go(0, function () {
        closing = false;
        swap();
        setTimeout(function () {
          quick = false;
          bookEl.classList.remove("quick");
        }, 600);
      });
      return;
    }
    swapping = true;
    var toBook = !entered,
      wait = toBook && (opened.l || opened.r) ? 600 * q : 0;
    if (toBook) closeDoors();
    setTimeout(function () {
      move(toBook);
    }, wait);
    setTimeout(
      function () {
        swapping = false;
        doors.classList.remove("fast");
      },
      wait + 1000 * q,
    );
  }
  function move(toBook) {
    var outS = toBook ? shO : bookEl,
      inS = toBook ? bookEl : shO;
    entered = toBook;
    document.body.classList.toggle("entered", toBook);
    stageEl.inert = !toBook;
    shO.inert = toBook;
    (toBook ? nx : btn.l.f).focus({ preventScroll: true });
    outS.classList.add("out");
    inS.classList.remove("bk");
    setTimeout(function () {
      stageEl.classList.toggle("top", toBook);
      outS.classList.remove("out");
      outS.classList.add("bk");
    }, 400 * q);
  }

  /* Klik pada bagian kartu belakang yang mengintip */
  function hit(el, e) {
    var r = el.getBoundingClientRect();
    return (
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom
    );
  }
  function onPeek(e) {
    if (swapping || closing || !ready) return false;
    if (e.target.closest && e.target.closest(".ctl,.door")) return false;
    var f = entered ? bookEl : shO,
      b = entered ? shO : bookEl;
    return hit(b, e) && !hit(f, e);
  }
  document.addEventListener("click", function (e) {
    if (onPeek(e)) swap();
  });
  document.addEventListener(
    "mousemove",
    function (e) {
      document.body.style.cursor = onPeek(e) ? "pointer" : "";
    },
    { passive: true },
  );
  lanjut.addEventListener("click", swap);
  /* Tombol "Tutup pintu" (terlihat di HP) */
  document.getElementById("tutup").addEventListener("click", function () {
    ["l", "r"].forEach(function (s) {
      if (opened[s]) toggle(s);
    });
    btn.l.f.focus({ preventScroll: true });
  });
  bkBtn.addEventListener("click", swap);

  /* Musik latar: mulai otomatis pada sentuhan/klik pertama (browser melarang autoplay tanpa interaksi) */
  var bgm = document.getElementById("bgm"),
    mu = document.getElementById("mu"),
    userOff = false,
    wasOn = false;
  bgm.volume = 0.6;
  function syncMu() {
    var on = !bgm.paused;
    mu.classList.toggle("on", on);
    mu.setAttribute("aria-pressed", on);
    mu.setAttribute("aria-label", on ? "Matikan musik" : "Putar musik");
  }
  function startMusic() {
    if (userOff || !bgm.paused) return;
    var p = bgm.play();
    if (p && p.catch) p.catch(function () {});
  }
  ["click", "touchend", "keydown"].forEach(function (ev) {
    document.addEventListener(ev, startMusic, { passive: true });
  });
  mu.addEventListener("click", function (e) {
    e.stopPropagation();
    if (bgm.paused) {
      userOff = false;
      startMusic();
    } else {
      userOff = true;
      bgm.pause();
    }
    syncMu();
  });
  bgm.addEventListener("play", syncMu);
  bgm.addEventListener("pause", syncMu);
  /* Jeda saat tab disembunyikan, lanjut saat kembali */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      wasOn = !bgm.paused;
      bgm.pause();
    } else if (wasOn && !userOff) {
      startMusic();
    }
  });
  syncMu();

  /* Efek suara balik halaman (audio/flip.mp3). Ikut mati kalau pengunjung mematikan suara lewat tombol musik */
  var flipSnd = new Audio("audio/flip.mp3"),
    lastSfx = 0;
  flipSnd.preload = "auto";
  flipSnd.volume = 0.8;
  function sfx() {
    var now = Date.now();
    if (userOff || now - lastSfx < 220) return;
    lastSfx = now;
    var a = flipSnd.cloneNode();
    a.volume = flipSnd.volume;
    var p = a.play();
    if (p && p.catch) p.catch(function () {});
  }
})();
