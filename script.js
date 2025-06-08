/*



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


//ページの読み込み完了時に処理を実行
window.addEventListener("load", () => {
    //3秒後にローディング画面を非表示にする
    setTimeout(() => {
        loader.classList.add("loaded");
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
        popups[index].style.display = 'block'; // 対応するポップアップを表示
        setTimeout(() => {
            popups[index].style.opacity = 1; // フェードインして表示
        }, 10); // 少し遅らせてopacityを1に設定
    });
});

// 各ポップアップの閉じるボタンをクリックしたときにポップアップを閉じる
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.closest('.popup').style.opacity = 0; // opacityを0にしてフェードアウト
        setTimeout(() => {
            btn.closest('.popup').style.display = 'none'; // 非表示にする
        }, 1000); // opacityのアニメーションが終わった後に非表示にする
    });
});

// ポップアップ背景をクリックしたら閉じる
popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) { // 背景をクリックした場合
            popup.style.opacity = 0; // フェードアウト
            setTimeout(() => {
                popup.style.display = 'none'; // 非表示にする
            }, 1000); // opacityのアニメーションが終わった後に非表示にする
        }
    });
});

// ボタンクリック時にトグルする関数
toggleButton.addEventListener('click', function() {
    // 'show'クラスをトグル（切り替え）
    toggleContent.classList.toggle('show');
});
