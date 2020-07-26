function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
            $('#loading').show();
        };
        reader.readAsDataURL(input.files[0]);
        init().then(() => {
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

$(function () {
    var checkbox = $('#checkbox'),
        path = $('#path'),
        bow = $('#bow'),
        male = $('#male');

    checkbox.on('change', function () {
        if ($(this).is(':checked')) {
            male.removeClass('ma');
            setTimeout(function () {
                path.addClass('fe');
                male.addClass('fe');
                bow.addClass('fe');
            }, 390);
        } else {
            male.addClass('ma');
            setTimeout(function () {
                path.removeClass('fe');
                male.removeClass('fe');
                bow.removeClass('fe');
            }, 390);
        }
    });
});

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const maleURL = 'https://teachablemachine.withgoogle.com/models/GmUj75-rG/';
const femaleURL = 'https://teachablemachine.withgoogle.com/models/iKc5S3pl_/';
var URL;

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    console.log('model init!');

    if (document.getElementById('checkbox').checked) URL = femaleURL;
    else URL = maleURL;

    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        var element = document.createElement('div');
        element.classList.add('d-flex');
        labelContainer.appendChild(element);
    }
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById('face-image');
    const prediction = await model.predict(image);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    console.log(prediction[0].className);
    var resultTitle, resultExplain, resultCeleb;
    if (document.getElementById('checkbox').checked == false) {
        switch (prediction[0].className) {
            case 'dog':
                resultTitle = '귀여운 순둥이 강아지상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb = '강아지상 연예인: 강다니엘, 백현(엑소), 박보검, 송중기';
                break;
            case 'cat':
                resultTitle = '츤데레 매력쟁이 고양이상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb =
                //     '고양이상 연예인: 황민현(뉴이스트), 시우민(엑소), 강동원, 이종석, 이준기';
                break;
            case 'rabbit':
                resultTitle = '천진난만한 매력의 토끼상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb =
                //     '토끼상 연예인: 정국(방탄소년단), 바비(아이콘), 박지훈(워너원), 수호(엑소)';
                break;
            case 'dinosaur':
                resultTitle = '따뜻한 나쁜남자 공룡상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb =
                //     '공룡상 연예인: 윤두준(하이라이트), 이민기, 김우빈, 육성재(비투비), 공유';
                break;
            case 'bear':
                resultTitle = '포근한 매력의 곰상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb = '곰상 연예인: 마동석, 조진웅, 조세호, 안재홍';
                break;
            default:
                resultTitle = '알수없음';
                resultExplain = '';
                resultCeleb = '';
        }
    } else {
        switch (prediction[0].className) {
            case 'dog':
                resultTitle = '귀여운 순둥이 강아지상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb = '강아지상 연예인: 박보영, 아이유, 윤승아, 민아(걸스데이), 한지민';
                break;
            case 'cat':
                resultTitle = '츤데레 매력쟁이 고양이상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb = '고양이상 연예인: 안소희(원더걸스), 오연서, 한예슬, 이성경, 이효리';
                break;
            case 'rabbit':
                resultTitle = '상큼발랄한 매력의 토끼상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb =
                //     '토끼상 연예인: 수지, 나연(트와이스), 예린(여자친구), 한승연(카라), 문채원';
                break;
            case 'deer':
                resultTitle = '온순하고 우아한 사슴상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb =
                //     '사슴상 연예인: 윤아(소녀시대), 이연희, 고아라, 문근영, 정유미(부산행 배우)';
                break;
            case 'fox':
                resultTitle = '섹시한 밀당고수 여우상';
                resultExplain = '';
                resultCeleb = '';
                // resultCeleb =
                //     '여우상 연예인: 경리(나인뮤지스), 예지(있지), 한혜진(모델), 헤이즈, 지연(티아라)';
                break;
            default:
                resultTitle = '알수없음';
                resultExplain = '';
                resultCeleb = '';
        }
    }
    var title =
        "<div class='" + prediction[0].className + "-animal-title'>" + resultTitle + '</div>';
    var explain = "<div class='animal-explain pt-2'>" + resultExplain + '</div>';
    var celeb =
        "<div class='" +
        prediction[0].className +
        "-animal-celeb pt-2 pb-2'>" +
        resultCeleb +
        '</div>';
    $('.result-message').html(title + explain + celeb);

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + '%';
        } else if (prediction[i].probability.toFixed(2) >= 0.01) {
            barWidth = '4%';
        } else {
            barWidth = '2%';
        }

        var labelTitle;
        switch (prediction[i].className) {
            case 'dog':
                labelTitle = '강아지상';
                break;
            case 'cat':
                labelTitle = '고양이상';
                break;
            case 'bear':
                labelTitle = '곰상';
                break;
            case 'dinosaur':
                labelTitle = '공룡상';
                break;
            case 'rabbit':
                labelTitle = '토끼상';
                break;
            case 'deer':
                labelTitle = '사슴상';
                break;
            case 'fox':
                labelTitle = '여우상';
                break;
            default:
                labelTitle = '알수없음';
        }

        var label = "<div class='animal-label d-flex align-items-center'>" + labelTitle + '</div>';
        var bar =
            "<div class='bar-container position-relative container'><div class='" +
            prediction[i].className +
            "-box'></div><div class='d-flex justify-content-center align-items-center " +
            prediction[i].className +
            "-bar' style='width: " +
            barWidth +
            "'><span class='d-block percent-text'>" +
            Math.round(prediction[i].probability.toFixed(2) * 100) +
            '%</span></div></div>';

        labelContainer.childNodes[i].innerHTML = label + bar;
    }
}