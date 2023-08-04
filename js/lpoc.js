// 獲取DOM元素
// const hamburgerIcon = document.querySelector('.hamburger-icon');
// const menu = document.querySelector('.menu');
// const mainMenu = document.querySelector('.mainMenu');
// const navInfo = document.querySelector('.navInfo');
// const h1 = document.querySelector('.h1');
// const header = document.querySelector('.header');

// // 用於儲存目前視窗寬度是否小於768px的狀態
// let isSmallScreen = window.innerWidth < 768;

// // 更新選單狀態（顯示或隱藏）的函式
// const updateMenuState = () => {
//   if (isSmallScreen) {
//     menu.classList.remove('show');
//     // 將 navInfo 容器插入 menu 容器裡
//     if (navInfo.parentNode !== menu) {
//       menu.prepend(navInfo);
//     }
//   } else {
//     menu.classList.remove('show');
//     menu.style.maxHeight = ''; // 清除max-height屬性
//     // 從 menu 容器裡移除 navInfo 容器
//     if (navInfo.parentNode === menu) {
//       header.insertBefore(navInfo, mainMenu);
//       // menu.removeChild(navInfo);
//     }
//   }
// };

// // 監聽視窗大小的變化
// window.addEventListener('resize', () => {
//   const newIsSmallScreen = window.innerWidth < 768;
//   if (isSmallScreen !== newIsSmallScreen) {
//     isSmallScreen = newIsSmallScreen;
//     updateMenuState();
//   }
// });

// // 點擊漢堡圖示，顯示或隱藏選單
// hamburgerIcon.addEventListener('click', () => {
//   menu.classList.toggle('show');
//   if (menu.classList.contains('show')) {
//     // 動態計算選單的高度並應用到滑動效果上
//     menu.style.maxHeight = menu.scrollHeight + 'px';
//   } else {
//     menu.style.maxHeight = '0';
//   }
// });

// // 初始化
// updateMenuState();

function scrollTables(obj) {
    let el = document.querySelectorAll(obj) || null; // --- 按鈕列表名稱
    let realTable = [];

    // --- 檢查父層有沒有 tableList
    function appendEle() {
      el.forEach((i) => {
        let _appendLeftEle;
        let _appendRightEle;
        let _leftBtn;
        let _rightBtn;
        let _hasItem = i.parentElement.classList.contains('tableList');
        let _hasNavLeft = i.parentElement.querySelector('.scrollTableNavLeft');
        if (!_hasItem && _hasNavLeft === null) {
          _appendLeftEle = document.createElement('div');
          _appendLeftEle.setAttribute('class', 'scrollTableNav scrollTableNavLeft');
          _appendLeftEle.style.height = `${i.parentElement.clientHeight}px`;
          _appendRightEle = document.createElement('div');
          _appendRightEle.setAttribute('class', 'scrollTableNav scrollTableNavRight');
          _appendRightEle.style.height = `${i.parentElement.clientHeight}px`;
          i.parentElement.style.position = 'relative';
          i.parentElement.prepend(_appendLeftEle, _appendRightEle);
          // --- 增加左邊按鈕
          _leftBtn = document.createElement('div');
          _leftBtn.setAttribute('class', 'scrollTableLeftBtn');
          _appendLeftEle.appendChild(_leftBtn);
          // --- 增加右邊按鈕
          _rightBtn = document.createElement('div');
          _rightBtn.setAttribute('class', 'scrollTableRightBtn');
          _appendRightEle.appendChild(_rightBtn);
          realTable.push(i);
          displayNoneEle(i);
        }
      });
    }

    // --- 開關遮罩功能
    function displayNoneEle(i) {
      // --- 父層元素的寬;
      let _table = i.parentElement.clientWidth || 200;
      // --- 子層元素的寬
      let _tableItem = i.scrollWidth;
      // --- 左邊遮罩
      let _rightEle = i.parentElement.querySelector('.scrollTableNavRight');
      // --- 右邊遮罩
      let _leftEle = i.parentElement.querySelector('.scrollTableNavLeft');
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
        i.parentElement.addEventListener('scroll', () => {
          // --- 父層元素的寬
          let _table = i.parentElement.clientWidth;
          // --- 子層元素的寬
          let _tableItem = i.scrollWidth;
          // --- 左邊遮罩
          let _rightEle = i.parentElement.querySelector('.scrollTableNavRight');
          // --- 右邊遮罩
          let _leftEle = i.parentElement.querySelector('.scrollTableNavLeft');
          // --- 捲軸位置
          let _scrollPosition = i.parentElement.scrollLeft;
          _rightEle.style.right = `-${i.parentElement.scrollLeft}px`;
          _leftEle.style.left = `${i.parentElement.scrollLeft}px`;

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
            i.parentElement.parentElement.scrollLeft -= 200;
          });
        });
      }
      // --- 點擊右邊按鈕
      const rightBtn = document.querySelectorAll('.scrollTableRightBtn');
      if (rightBtn.length !== 0) {
        rightBtn.forEach((i) => {
          i.addEventListener('click', (item) => {
            i.parentElement.parentElement.scrollLeft += 200;
          });
        });
      }
    }

    appendEle();
    clickEleBtn();
    // --- resize
    window.addEventListener('resize', () => {
      realTable.forEach((i) => {
        displayNoneEle(i);
      });
    });
  }

  window.addEventListener('load', () => {
    scrollTables('table');
  });


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

