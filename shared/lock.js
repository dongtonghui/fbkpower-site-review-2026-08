/* ============================================================
   FBK POWER 复盘 Deck · 前端访问锁
   - 直接访问 slides/*.html 时，未解锁则跳回 index.html
   - index.html 自身（含 #lockOverlay）不触发跳转
   - 同源 iframe（演示模式）共享 sessionStorage，解锁后正常放行
   - 注意：必须在 DOM 就绪后检查（head 同步执行时 body 未解析）
   ============================================================ */
(function () {
  function check() {
    var unlocked = false;
    try {
      unlocked = sessionStorage.getItem("fbkdeck_unlocked") === "1";
    } catch (e) { /* storage 不可用时保持锁定 */ }

    var isIndex = !!document.getElementById("lockOverlay");

    if (window.top === window.self && !isIndex && !unlocked) {
      location.replace("../index.html");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", check);
  } else {
    check();
  }
})();
