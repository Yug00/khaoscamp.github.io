/*
万博、すっごい混んでた。
*/

const popupBtns = document.querySelectorAll('.popup-btn'); // 複数のボタンを取得
const popups = document.querySelectorAll('.popup'); // 複数のポップアップを取得
const closeBtns = document.querySelectorAll('.close-btn'); // 複数の閉じるボタンを取得
const loader = document.querySelector(".loader");
const textElement = document.getElementById('title');
const text = "タマキユーゴがカオスキャンプに応募するためのサイト";
const lineLength = 10; // 改行を入れる文字数
let index = 0; // 文字のインデックス
const loadingTime = 2000
const textTime = 40
const toggleButton = document.getElementById('toggleButton');
const toggleContent = document.getElementById('toggleContent');
const carousels = document.querySelectorAll('.carousel');
const leftArrows = document.querySelectorAll('.left-arrow');
const rightArrows = document.querySelectorAll('.right-arrow');
const thumbnails = document.querySelectorAll('.thumbnail');
const accordionButtons = document.querySelectorAll('.accordion-button');
const emerging = document.querySelectorAll('.emerging');


//ページの読み込み完了時に処理を実行
window.addEventListener("load", () => {
    //3秒後にローディング画面を非表示にする
    setTimeout(() => {
        loader.classList.add("loaded");
        document.body.style.overflow = "auto";
    }, loadingTime);
});

// タイトルをゆっくり表示する
function typeText() {
    if (index < text.length) {
        // 1文字ずつspan要素を作成
        const span = document.createElement('span');
        const char = text.charAt(index); // 現在の文字を取得
        span.textContent = char;
        textElement.appendChild(span); // h1に追加

        // 文字を少し遅れて表示
        setTimeout(() => {
            span.style.opacity = 1; // opacityを1にして文字を表示
        }, index * textTime); // 文字ごとに遅延を加える（100ms）

        // 改行を挿入する
        if (index == 6 || index == 14) {
            const br = document.createElement('br');
            textElement.appendChild(br); // 改行を追加
        }

        index++; // 次の文字に進む

        // 次の文字をタイムアウトで追加
        setTimeout(typeText, textTime); // 100ms後に次の文字を追加
    }
}


// 最初に文字のタイプライティングを開始
setTimeout(typeText, loadingTime);

// 各ポップアップボタンをクリックしたときに対応するポップアップを表示
popupBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        popups[index].style.display = 'flex'; // 対応するポップアップを表示
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            popups[index].style.opacity = 1; // フェードインして表示
        }, 10); // 少し遅らせてopacityを1に設定
    });
});

// 各ポップアップの閉じるボタンをクリックしたときにポップアップを閉じる
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.closest('.popup').style.opacity = 0; // opacityを0にしてフェードアウト
        document.body.style.overflow = "auto";
        setTimeout(() => {
            btn.closest('.popup').style.display = 'none'; // 非表示にする
        }, 500); // opacityのアニメーションが終わった後に非表示にする
    });
});

// ポップアップ背景をクリックしたら閉じる
popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) { // 背景をクリックした場合
            popup.style.opacity = 0; // フェードアウト
            document.body.style.overflow = "auto";
            setTimeout(() => {
                popup.style.display = 'none'; // 非表示にする
            }, 500); // opacityのアニメーションが終わった後に非表示にする
        }
    });
});

accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
        const content = this.nextElementSibling;
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== content) {
                item.classList.remove('open');
            }
        });
        content.classList.toggle('open');
    });
});

// カルーセルの各スライドに対して設定
carousels.forEach((carousel, index) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    // 左矢印クリック時
    leftArrows[index].addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel(carousel, slides, currentIndex);
    });

    // 右矢印クリック時
    rightArrows[index].addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        }
        updateCarousel(carousel, slides, currentIndex);
    });

    // サムネイルのクリックイベント - 修正
    const popup = carousel.closest('.popup');
    const carouselThumbnails = popup.querySelectorAll('.thumbnails .thumbnail');
    carouselThumbnails.forEach((thumbnail, thumbnailIndex) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = thumbnailIndex;
            updateCarousel(carousel, slides, currentIndex);
        });
    });

    // カルーセル更新関数
    function updateCarousel(carousel, slides, currentIndex) {
        const slideWidth = slides[0].offsetWidth; // 各スライドの幅
        const newTransformValue = -currentIndex * slideWidth;
        carousel.style.transform = `translateX(${newTransformValue}px)`; // スライドを移動

        // サムネイル選択状態の更新
        carouselThumbnails.forEach((thumbnail, index) => {
            if (index === currentIndex) {
                thumbnail.classList.add('selected');
            } else {
                thumbnail.classList.remove('selected');
            }
        });
    }
});

window.addEventListener('scroll', checkImages);

function checkImages() {
    // 各画像に対して表示されるべきかチェック
    emerging.forEach(image => {
        const imageTop = image.getBoundingClientRect().top; // 画像の上端位置
        const imageBottom = image.getBoundingClientRect().bottom; // 画像の下端位置
        const windowHeight = window.innerHeight; // ビューの高さ

        // 画像がスクリーンに表示される範囲に入ったらvisibleクラスを追加
        if (imageTop < windowHeight && imageBottom >= 0) {
            image.classList.add('visible');
        }
    });
}

// ページ読み込み時にすぐに実行して初期状態を確認
checkImages();
