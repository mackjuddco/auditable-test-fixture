/* =========================================================================
   City of Muddville — shared behavior
   Holds SITE-WIDE interaction failures. Each is tagged WCAG-FAIL.
   See CRITERIA.md for the full map.
   ========================================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     WCAG-FAIL 2.1.4 (A) Character Key Shortcuts
     Pressing the single character "s" anywhere on the page jumps focus to
     the site search box. There is no modifier, and no mechanism to turn it
     off or remap it. (It skips firing while you're typing in a field, but
     that does not satisfy 2.1.4 — the shortcut still cannot be disabled.)
  ----------------------------------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "s" && e.key !== "S") return;
    var t = e.target;
    var typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (typing) return;
    var box = document.getElementById("sitesearch");
    if (box) { box.focus(); e.preventDefault(); }
  });

  /* -----------------------------------------------------------------------
     WCAG-FAIL 2.2.2 (A) Pause, Stop, Hide   (auto-advancing carousel)
     WCAG-FAIL 2.5.1 (A) Pointer Gestures    (manual control is swipe-only)
     The carousel advances itself every 3s with no pause/stop/hide control.
     The only way to move it manually is a horizontal swipe (a path-based
     gesture) — there is no single-tap/click or button alternative.
  ----------------------------------------------------------------------- */
  document.querySelectorAll(".carousel").forEach(function (car) {
    var slides = Array.prototype.slice.call(car.querySelectorAll(".slide"));
    if (!slides.length) return;
    var i = 0;
    function show(n) {
      slides.forEach(function (s, k) { s.classList.toggle("active", k === n); });
    }
    show(0);
    setInterval(function () { i = (i + 1) % slides.length; show(i); }, 3000);

    // swipe-only manual control (no click/tap/button equivalent)
    var startX = null;
    car.addEventListener("pointerdown", function (e) { startX = e.clientX; });
    car.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) {
        i = dx < 0 ? (i + 1) % slides.length : (i - 1 + slides.length) % slides.length;
        show(i);
      }
      startX = null;
    });
  });

  /* -----------------------------------------------------------------------
     WCAG-FAIL 2.1.2 (A) No Keyboard Trap
     The newsletter dialog traps keyboard focus: while open, Tab / Shift+Tab
     are forced to cycle only within the dialog and Escape is ignored. The
     only way out is the Close button, which responds to the mouse only — a
     keyboard user cannot escape the dialog.
  ----------------------------------------------------------------------- */
  var modal = document.querySelector("[data-modal]");
  var opener = document.querySelector("[data-open-modal]");
  if (modal && opener) {
    function focusables() {
      return Array.prototype.slice.call(
        modal.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')
      ).filter(function (el) { return !el.disabled && !el.hasAttribute("data-close-modal"); });
    }
    function open() {
      modal.style.display = "block";
      var f = focusables();
      if (f.length) f[0].focus();
    }
    function trap(e) {
      if (modal.style.display !== "block") return;
      if (e.key === "Escape") { e.preventDefault(); return; } // Esc deliberately ignored
      if (e.key !== "Tab") return;
      var f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
    opener.addEventListener("click", open);
    document.addEventListener("keydown", trap, true);

    // Close works on mouse click only (keyboard users stay trapped).
    var closer = modal.querySelector("[data-close-modal]");
    if (closer) {
      closer.addEventListener("click", function () { modal.style.display = "none"; });
    }
  }
})();
