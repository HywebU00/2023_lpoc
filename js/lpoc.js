// scrollTables
function scrollTables(obj) {
  let el = document.querySelectorAll(obj) || null; // --- 按鈕列表名稱

  // --- scrollTables 初始化
  function appendEle() {
    el.forEach((i) => {
      i.style.position = 'relative';
      const table = i.querySelector('table');
      const wrapElement = document.createElement('div');
      wrapElement.className = 'tableScroll';

      table.replaceWith(wrapElement);
      wrapElement.appendChild(table);

      // --- 產生左邊按鈕
      let _appendLeftEle;
      let _leftBtn;
      _appendLeftEle = document.createElement('div');
      _appendLeftEle.setAttribute('class', 'scrollTableNav scrollTableNavLeft');
      _appendLeftEle.style.height = `${i.clientHeight}px`;
      _leftBtn = document.createElement('div');
      _leftBtn.setAttribute('class', 'scrollTableLeftBtn');
      _appendLeftEle.appendChild(_leftBtn);

      // --- 產生右邊按鈕
      let _appendRightEle;
      let _rightBtn;
      _appendRightEle = document.createElement('div');
      _appendRightEle.setAttribute('class', 'scrollTableNav scrollTableNavRight');
      _appendRightEle.style.height = `${i.clientHeight}px`;
      _rightBtn = document.createElement('div');
      _rightBtn.setAttribute('class', 'scrollTableRightBtn');
      _appendRightEle.appendChild(_rightBtn);

      // --- 新增按鈕
      i.prepend(_appendLeftEle, _appendRightEle);

      displayNoneEle(i);
    });
  }

  // --- 開關遮罩功能
  function displayNoneEle(i) {
    // --- 父層元素的寬;
    let _table = i.querySelector('.tableScroll').clientWidth || 200;
    // --- 子層元素的寬
    let _tableItem = i.querySelector('.tableScroll').scrollWidth;
    // --- 左邊遮罩
    let _rightEle = i.querySelector('.scrollTableNavRight');
    // --- 右邊遮罩
    let _leftEle = i.querySelector('.scrollTableNavLeft');
    // --- 如果沒有建立遮罩
    if (_rightEle == null) {
      return;
    }
    // --- 如果子層跟父層一樣寬度
    if (_table === _tableItem) {
      _leftEle.style.display = 'none';
      _rightEle.style.display = 'none';
    } else {
      i.parentElement.scrollLeft = '0';
      _rightEle.style.display = 'block';
      _rightEle.style.opacity = '1';
    }
    eleScroll();
  }
  // --- 當父層滾輪滾動
  function eleScroll() {
    el.forEach((i) => {
      i.querySelector('.tableScroll').addEventListener('scroll', () => {
        // --- 父層元素的寬
        let _table = i.querySelector('.tableScroll').clientWidth;
        // --- 子層元素的寬
        let _tableItem = i.querySelector('.tableScroll').scrollWidth;
        // --- 左邊遮罩
        let _rightEle = i.querySelector('.scrollTableNavRight');
        // --- 右邊遮罩
        let _leftEle = i.querySelector('.scrollTableNavLeft');
        // --- 捲軸位置
        let _scrollPosition = i.querySelector('.tableScroll').scrollLeft;

        if (_scrollPosition === 0) {
          _leftEle.style.opacity = 0;
          _rightEle.style.opacity = 1;
        }
        // --- 如果捲軸位置還沒到底
        if (_scrollPosition > 0) {
          _leftEle.style.opacity = 1;
        }
        // --- 如果捲軸位置＋父層寬度 ＝ 子層寬度
        if (_scrollPosition + _table === _tableItem) {
          _rightEle.style.opacity = 0;
          _leftEle.style.opacity = 1;
          _leftEle.style.display = 'block';
        }
        // --- 如果捲軸位置＋父層寬度 < 子層寬度
        if (_scrollPosition + _table < _tableItem) {
          _rightEle.style.opacity = 1;
        }
      });
    });
  }

  // --- 點擊左右按鈕時滾動畫面
  function clickEleBtn() {
    // --- 點擊左邊按鈕
    const leftBtn = document.querySelectorAll('.scrollTableLeftBtn');
    if (leftBtn.length !== 0) {
      leftBtn.forEach((i) => {
        i.addEventListener('click', (item) => {
          i.parentElement.parentElement.querySelector('.tableScroll').scrollLeft -= 200;
        });
      });
    }
    // --- 點擊右邊按鈕
    const rightBtn = document.querySelectorAll('.scrollTableRightBtn');
    rightBtn?.forEach((i) => {
      i.addEventListener('click', (item) => {
        i.parentElement.parentElement.querySelector('.tableScroll').scrollLeft += 200;
      });
    });
  }

  appendEle();
  clickEleBtn();
  // --- resize
  window.addEventListener('resize', () => {
    el.forEach((i) => {
      displayNoneEle(i);
    });
  });
}

window.addEventListener('load', () => {
  scrollTables('.tableWrapper');
});


// tableSort
(function () {
  'use strict';
  const tableSort = document.querySelectorAll('.tableSort');
  tableSort.forEach((table) => {
    let ths = table.querySelectorAll('.sortable');
    let i;
    let sortOrder = 1;

    ths.forEach((th, i) => {
      ths[i].addEventListener('click', function () {
        let rows = Array.prototype.slice.call(table.querySelectorAll('tbody > tr'));
        let col = this.cellIndex;
        let type = this.dataset.type;
        let _a;
        let _b;
        rows.sort(function (a, b) {
          if (type === 'number') {
            _a = a.children[col].textContent * 1;
            _b = b.children[col].textContent * 1;
          }
          if (type === 'string') {
            _a = a.children[col].textContent.toLowerCase();
            _b = b.children[col].textContent.toLowerCase();
          }
          if (_a < _b) {
            ths[i].classList.remove('sort-asc');
            ths[i].classList.add('sort-desc');
            return 1 * sortOrder;
          }
          if (_a > _b) {
            ths[i].classList.add('sort-asc');
            ths[i].classList.remove('sort-desc');
            return -1 * sortOrder;
          }
          return 0;
        });

        let tbody = table.querySelector('tbody');

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }

        let j;
        for (j = 0; j < rows.length; j++) {
          tbody.appendChild(rows[j]);
        }
        sortOrder *= -1;
      });
    });
  });
})();
