/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "a2md");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/Laa":
/*!****************************************!*\
  !*** ./src/app/solution-code/day14.ts ***!
  \****************************************/
/*! exports provided: dayFourteenPartTwo, dayFourteenInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFourteenPartTwo", function() { return dayFourteenPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFourteenInput", function() { return dayFourteenInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayFourteenPartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const maskRegex = /^mask = ([01X]+)$/;
    const memoryRegex = /^mem\[(\d+)\] = (\d+)$/;
    function fromBitArray(input) {
        return input.reduce((prev, curr, index) => {
            if (curr === '0')
                return prev;
            const bitValue = Math.pow(2, index);
            if (curr === 'X') {
                return [...prev, ...prev.map((val) => val + bitValue)];
            }
            else {
                // 1
                return prev.map((val) => val + bitValue);
            }
        }, [0]);
    }
    function toBitArray(input) {
        const bitArray = [];
        for (let i = 0; input !== 0; i++) {
            const bitValue = Math.pow(2, i);
            if ((input & bitValue) === bitValue) {
                bitArray.push('1');
                input -= bitValue;
            }
            else {
                bitArray.push('0');
            }
        }
        return bitArray;
    }
    function applyMaskToNumber(input, mask) {
        const asBitArray = toBitArray(input);
        return fromBitArray(mask.map((val, index) => { var _a; return (val === '0' ? (_a = asBitArray[index]) !== null && _a !== void 0 ? _a : '0' : val); }));
    }
    function setMaskOperation(maskValue) {
        maskValue.reverse(); // easier to perform bitwise operations like this :-)
        return {
            perform: (buffer) => (buffer.mask = maskValue),
        };
    }
    function setMemoryOperation(memoryAddress, memoryValue) {
        return {
            perform: (buffer) => {
                const memoryAddresses = applyMaskToNumber(memoryAddress, buffer.mask);
                for (const memoryAddress of memoryAddresses) {
                    buffer.memory.set(memoryAddress, memoryValue);
                }
            },
        };
    }
    function lineToOperation(line) {
        const memoryMatch = memoryRegex.exec(line);
        if (memoryMatch) {
            return setMemoryOperation(Number(memoryMatch[1]), Number(memoryMatch[2]));
        }
        const maskMatch = maskRegex.exec(line);
        if (maskMatch) {
            return setMaskOperation(maskMatch[1].split(''));
        }
        throw new Error(`Invalid line: ${line}`);
    }
    const operations = fileReader.readLineByLine(lineToOperation);
    const context = { mask: [], memory: new Map() };
    for (const operation of operations) {
        operation.perform(context);
    }
    const sumOfValues = Array.from(context.memory.values()).reduce((prev, curr) => prev + curr, 0);
    return sumOfValues;
}
const dayFourteenInput = `mask = 01X11X10X10110110X111X11010X1X101010
mem[19409] = 3025
mem[40104] = 798480382
mem[25359] = 905
mask = 01011X111100XX1100X1X10X110000000000
mem[55479] = 930785
mem[25548] = 130263864
mem[60518] = 202648
mem[11955] = 1138
mem[45248] = 753
mask = 00XX10001XXX00101X1XX1101000010X0010
mem[2050] = 27965
mem[5662] = 110507779
mem[60807] = 1608
mask = 000110101100XX10X01000X010X000010100
mem[28713] = 1039
mem[22733] = 182274602
mem[21460] = 12248397
mem[60257] = 103
mem[13722] = 137279
mem[2117] = 208446548
mask = 100110111X011X1X10110X11010001X11XX0
mem[29709] = 6606
mem[27812] = 143567051
mem[3595] = 478522065
mem[13123] = 7445318
mem[37070] = 32452
mem[60140] = 47608
mem[21316] = 69201021
mask = X10X0010110000111111X0X11X10X1000111
mem[29528] = 3980
mem[41054] = 274606
mem[34884] = 265241899
mem[7496] = 228368
mem[35014] = 109110
mem[40696] = 172101503
mask = 010X011010X0001X11101011X1X100010100
mem[23210] = 3864280
mem[53761] = 5046
mem[6853] = 1214
mem[45297] = 219
mem[33797] = 1843462
mask = 01011011110011110X0X01110110010XX000
mem[15509] = 16472647
mem[19332] = 526724681
mask = 0101X0101100X01X111X1X11X000X1X1X110
mem[16393] = 122368236
mem[18852] = 4351408
mem[56526] = 780
mem[46701] = 31085562
mem[53459] = 47134
mem[19409] = 7629114
mem[47891] = 76573711
mask = 000110X0010010X0X010XX110000X0X1000X
mem[35342] = 1095
mem[56466] = 3462270
mem[31124] = 204698678
mem[104] = 2115
mem[22733] = 154721
mask = 00X100X01XX000101X1001110000010XX110
mem[44047] = 6823624
mem[11955] = 242152
mem[41039] = 515174779
mask = 0101101X110X10110X11101011X00110XXXX
mem[46716] = 52535895
mem[20578] = 851818
mem[7307] = 1658
mem[59777] = 7566837
mem[38136] = 6
mem[18835] = 95379
mem[37574] = 28195477
mask = 010XXX101X0X0011X1100X1001110X01X100
mem[17831] = 4467
mem[45439] = 61064
mem[43070] = 291981105
mem[9562] = 725
mem[18574] = 82455219
mem[53761] = 2223
mask = 0001X010X1001010XX10011110000011000X
mem[24954] = 229575
mem[49643] = 118597
mem[40891] = 218656479
mem[6549] = 655
mem[16413] = 105021
mask = 01X0X01010010X111X1001X0X1X1X0000110
mem[24722] = 3306225
mem[18574] = 2046331
mem[51991] = 2879
mask = 010X10001X00XX10000000101100000X0000
mem[64694] = 69415191
mem[42979] = 1589
mem[49282] = 199
mem[3987] = 2386
mem[64631] = 17661
mask = 011XXX1010010111101X0000100100X10XX0
mem[21201] = 341993
mem[61134] = 328
mem[19716] = 463044
mem[53800] = 23668576
mem[46317] = 368717
mem[3978] = 2699
mask = X10X01X011001011X111101010X0XX111111
mem[5567] = 9644235
mem[50029] = 4717
mem[34043] = 119207
mem[35949] = 665131137
mem[58233] = 98752
mask = 0X00001011X0001111X000100X0000XX0110
mem[28818] = 809
mem[20113] = 604
mem[58178] = 11229
mem[9389] = 38294680
mem[34657] = 8016112
mem[10161] = 1585984
mem[8020] = 1403857
mask = 01011011110XX0110111111101100X000X01
mem[47451] = 201798
mem[62498] = 61888
mem[49564] = 16728
mem[60513] = 23392513
mem[36774] = 56575
mem[22431] = 70709
mask = 011X100011000X1X10X0101100X10X011111
mem[41938] = 34906
mem[62853] = 221817
mem[50173] = 471027372
mem[55286] = 4561108
mask = 1X010X0011010000X1100X000101X101X000
mem[22998] = 62382
mem[18574] = 57889052
mem[57700] = 1018
mask = X1XX0X1011001011111X101X111001111111
mem[34453] = 6483
mem[49122] = 391290
mask = 01010000000100110XX000011X00X01XX10X
mem[23870] = 19517
mem[24291] = 616878
mem[12134] = 1990123
mem[26637] = 55962054
mem[47968] = 712481177
mem[20878] = 242502
mem[30722] = 1568
mask = 11X11111X100XX1000100111100000000010
mem[35335] = 59630
mem[63185] = 11256526
mem[30722] = 266092278
mem[9776] = 63532545
mask = 10010010010X1010111X11001000X110101X
mem[12312] = 4029860
mem[27593] = 42705942
mem[46156] = 27895
mem[64088] = 1408576
mem[50342] = 15980145
mem[46315] = 29427
mem[47451] = 18865
mask = 011111001X0XX01010100110X11000X01100
mem[1293] = 837
mem[29000] = 10697
mask = XX0X0010X1001010XX11X01110X101101100
mem[42918] = 1028
mem[2608] = 3093
mem[21904] = 6098595
mem[41278] = 1039294
mem[53102] = 858102784
mask = 0X0110X01100X010X0X0001X10X00XX00000
mem[20578] = 860568571
mem[52466] = 143792
mem[10261] = 182
mask = 0X0110101100X011XX111X111110111X11XX
mem[5752] = 37841428
mem[31368] = 1094581
mask = 000X11101X01001110100001000X0100100X
mem[56372] = 1046359
mem[19541] = 315663570
mem[37436] = 437380
mem[54334] = 241690746
mem[16559] = 3127549
mem[59609] = 176914004
mask = 110101X01XX1000X0XX0100000X0000XX101
mem[1033] = 8174
mem[49587] = 107787
mem[1572] = 430
mem[49873] = 115828687
mem[24389] = 2707208
mem[30170] = 91827506
mask = 01XX01001XX10010X0101001000000011101
mem[26015] = 198698
mem[50136] = 19382
mem[16413] = 103882
mem[8340] = 2066093
mask = XX01101X1101101XX01111X01X1100X00100
mem[42378] = 518494
mem[13927] = 94055
mem[48225] = 15652034
mask = 000100X0110X101X0X1XXX1X10110011101X
mem[65006] = 6769
mem[46625] = 5473325
mem[22440] = 617624684
mem[24954] = 719974
mem[53626] = 62067
mask = 00011XX01101X01X1010X11X10000X00X0X0
mem[43072] = 106139234
mem[53459] = 26813614
mem[31162] = 184146764
mask = 0X01X0101X00001XXX10X11X000001000010
mem[5467] = 121320
mem[63724] = 11067492
mem[57246] = 315
mem[16413] = 2008242
mem[10240] = 11073
mem[24282] = 618660016
mask = 1101111011000010101X1101X0X0001X1011
mem[61598] = 627237127
mem[16057] = 235475116
mem[5662] = 6226
mem[61721] = 26023344
mem[58178] = 209547
mem[59687] = 141941
mem[9548] = 1392254
mask = 00011X1000X01010011X01111X0110X10100
mem[13185] = 300556
mem[51203] = 17097
mem[59687] = 8787507
mem[12337] = 124607
mem[46043] = 4378256
mask = 1100X100110100100110X10X000X01111101
mem[17458] = 420459
mem[46315] = 142385
mem[7273] = 58415
mem[49604] = 57549
mem[33375] = 12460422
mem[61540] = 7752
mask = X1X11XXX1100X010X0100100000000X00010
mem[28889] = 13691764
mem[27546] = 355436
mem[45337] = 10614
mem[64088] = 960
mem[39291] = 3019
mem[30722] = 1976602
mem[18725] = 299
mask = 0X111X1011000X101010X0X001X100XX1010
mem[5532] = 413573
mem[7707] = 78463710
mem[46156] = 25164851
mem[17354] = 15295191
mask = 000110100X0X10100X100011XX0010010000
mem[18725] = 7003
mem[49536] = 49752
mem[33519] = 116272721
mem[46701] = 253380665
mask = 000X001001001XXX101XX00X0101X1010000
mem[57459] = 792510
mem[10350] = 217210394
mem[43612] = 178868
mem[2374] = 42534899
mem[40891] = 621
mem[7270] = 1014999
mem[49038] = 1657373
mask = 00XX10100001100X01000110001001010X10
mem[7270] = 1904
mem[33267] = 171621958
mem[42531] = 623
mask = 011111001100001X00X0010X10010010001X
mem[59756] = 19646
mem[45248] = 182118
mem[49395] = 186
mem[46043] = 1875998
mem[42378] = 2150393
mem[16423] = 449813446
mask = 00X10X1001001010111X0X11100XX0101X01
mem[42378] = 11316
mem[6217] = 448726
mem[56349] = 105698
mem[18523] = 6560236
mask = 0X01101011000X101111X1110010X1110111
mem[57685] = 1052364113
mem[42200] = 1624
mem[64281] = 162750
mem[53459] = 900417618
mem[44010] = 311326
mem[38385] = 168338
mem[64234] = 715
mask = 0110001010X1001X111000XX01X110X1000X
mem[46270] = 413222
mem[20358] = 301418973
mask = 0101X01010000X1X111001000X010000X100
mem[25549] = 9478586
mem[27938] = 186993583
mem[10014] = 630139
mem[50316] = 22183454
mask = 00X10XX0110010100X10XX11X01000100010
mem[51762] = 575
mem[39895] = 33305
mem[19768] = 31036515
mem[30918] = 522221
mem[26371] = 790132
mem[43705] = 13814
mask = 00XXX010X1100010100101110101X0001110
mem[12495] = 2801000
mem[43811] = 35764
mem[59173] = 235362
mem[50677] = 13747007
mem[47458] = 49520
mask = 00X1101X1100X010X010001010000000010X
mem[19737] = 309
mem[10289] = 1391
mem[44222] = 202053013
mem[32818] = 57015
mask = XX111010X10XX0101010XX00000X00100X01
mem[25062] = 92115406
mem[40507] = 8539848
mem[6853] = 1555113
mem[59566] = 55734
mem[29440] = 3860
mem[2339] = 1687
mask = X0X100100100X000X0011000100100110001
mem[62983] = 496942
mem[55239] = 31959819
mem[23037] = 185
mem[14426] = 11052660
mem[59756] = 11483028
mask = 0X1X101011X0101X0X100110100110X101XX
mem[9761] = 26687118
mem[152] = 1818
mask = 01X110X01010001X1110XXX0000100X100X0
mem[46327] = 780262
mem[11424] = 1003003
mask = 010011XX100X0011X1XX000X01X10X011110
mem[40928] = 10697
mem[989] = 22449916
mem[9034] = 107225
mask = 010100X0X001001101100XX110X0000X10X0
mem[50403] = 60110
mem[1465] = 9126
mem[4598] = 348452
mem[26661] = 17672110
mask = 00X110101XX00010100X0010010011X10010
mem[38295] = 20183
mem[61069] = 22691
mem[51394] = 7278100
mem[18711] = 34474
mem[52888] = 1962576
mask = 1001001X0X001010101X0110XXX001XX100X
mem[33226] = 3641501
mem[2376] = 72068973
mem[57257] = 11382653
mem[22489] = 47282
mem[45359] = 38362
mask = 010X1X10010X101X01111010111110111011
mem[26980] = 755824
mem[47763] = 385
mem[23332] = 30083831
mem[32975] = 61896119
mask = XX0110111101X011X011X0XXX10000011100
mem[29709] = 711754376
mem[36513] = 71516
mem[7293] = 5061813
mem[60256] = 419151
mask = 0101101011000XX1111111X001100100XX00
mem[19475] = 35852
mem[57183] = 6494332
mem[1327] = 872346
mem[2543] = 943
mem[2188] = 868813
mem[29387] = 209125695
mask = 00X1X0101X1000X01X010X1X01100X0X1101
mem[51955] = 196066365
mem[38207] = 15671526
mem[26980] = 75520251
mem[11077] = 161630247
mem[26456] = 30666501
mem[19737] = 9386
mask = 1101011010110X0X01101XX001X0X001X001
mem[49292] = 858273
mem[11497] = 884831
mem[49282] = 93065
mem[54031] = 862594
mask = 0X01011010X1X01111X0X0X00X11X1010100
mem[58536] = 4031842
mem[11621] = 155458283
mem[8786] = 12859
mask = 00010010XXX000X010010X1XX001X0X01100
mem[45429] = 122467
mem[57256] = 759
mem[3687] = 384128816
mem[56464] = 10758724
mem[11869] = 652805159
mem[50173] = 75914445
mask = 0001001001001010111XX10X1X0XX0111101
mem[5809] = 743780
mem[52067] = 806
mem[12750] = 22132
mem[13019] = 654
mask = 00X110X01100101X00100X1X00XX00100001
mem[2117] = 4067660
mem[2068] = 9851885
mem[48662] = 52185630
mem[24246] = 72048
mem[25978] = 5182633
mask = 010X1010X0X0001111100X001101X01X0XX0
mem[10242] = 1118
mem[57601] = 525
mem[38099] = 930509
mask = 10111101110X0X10001001X00001001000X1
mem[50741] = 59787235
mem[1588] = 218533
mem[33080] = 182579
mem[3978] = 1591079
mem[62070] = 15472
mask = 0101100X1100X0X10110X010000X000X00X1
mem[3814] = 788124
mem[63265] = 215577374
mem[57364] = 1311024
mem[36364] = 3985
mem[18564] = 4526
mem[23647] = 376609
mask = 001XX00011010010111000101X100X0011X0
mem[61429] = 6896
mem[22094] = 1966698
mask = X00110111101XX111011101X011010100X01
mem[36214] = 310642
mem[59733] = 1160
mem[10909] = 1820
mem[25225] = 51102962
mem[35074] = 514484736
mem[21460] = 3630
mask = 1001001X01001010XX10111001XX1X1X1000
mem[53608] = 6145
mem[44618] = 302105
mem[50955] = 12609449
mem[48282] = 22035626
mask = 01X1XX001XXX001XX0100111000000001100
mem[47458] = 4534
mem[26444] = 4150059
mem[10366] = 1061
mem[51657] = 2817023
mem[35995] = 1064419
mem[38295] = 148703436
mask = 01X0001010010X1110X0000010111X001000
mem[26046] = 2672378
mem[1080] = 682
mem[2151] = 737
mask = 110X0100110100X001X0X1XXX100011101X0
mem[56044] = 527135884
mem[39296] = 107094645
mem[61785] = 1261
mask = 01001X00100X0011010000000101000XX101
mem[54752] = 16579540
mem[36330] = 1696582
mem[1435] = 240113842
mem[49758] = 7811
mem[51729] = 2543212
mem[10909] = 13139
mask = 0X0XXX100001101X011010101000011001XX
mem[58487] = 9986
mem[7175] = 3371969
mem[14294] = 10275
mem[36225] = 13168
mem[7934] = 48879
mem[47891] = 1571293
mem[18711] = 399
mask = X1010XX01X01001X01101010X1X00001X010
mem[62247] = 18380710
mem[20715] = 15548870
mem[61924] = 28821546
mem[40119] = 181518508
mem[50251] = 59934
mask = XXX1011X11X100X1X110001011X001100001
mem[13627] = 4734
mem[36208] = 48295
mem[37672] = 184327969
mem[60518] = 9137
mem[46168] = 105126453
mask = 1X111101110X0010001000XX000100XXX011
mem[4455] = 17333982
mem[58592] = 931411
mem[61752] = 198443
mem[183] = 808
mask = XX010010010XX0101011111111010011X100
mem[6221] = 256009562
mem[3528] = 422478
mem[16002] = 6328770
mask = 0X01X00011001010XX000010100000100010
mem[31570] = 32237
mem[14971] = 846258186
mem[18978] = 1202
mem[15368] = 120674
mem[13185] = 22420
mask = 010110111101101XX011X11XX11X00X00X00
mem[59330] = 628
mem[9283] = 58883
mem[44010] = 387833048
mask = 010010101001X1111010111X000X00X0X110
mem[50633] = 751888
mem[11056] = 31979
mem[50741] = 4724
mem[40028] = 7336181
mem[42263] = 6863
mask = 0001X010110000X00010010X10000XX10100
mem[20546] = 8708
mem[36908] = 234294
mem[63185] = 1408
mem[57531] = 1054
mem[13722] = 1045167819
mem[4617] = 3519205
mask = 00111000X10010X10010X01010X00010010X
mem[46693] = 4740
mem[17824] = 884
mem[54997] = 339096
mem[2117] = 26803
mem[20] = 84635057
mask = 0101XXX01100X011011X010000000X00X100
mem[40142] = 140297
mem[53459] = 5575659
mem[57435] = 69641959
mem[28563] = 433881
mem[59188] = 230341
mem[26483] = 151116806
mask = 110101X01XX100X10110001XX1X0X01000X1
mem[37526] = 454911
mem[35793] = 3340
mem[54537] = 630806
mem[58456] = 115228
mem[59172] = 13363
mask = 010110X0110000101010X001111X0X010010
mem[45969] = 1736711
mem[2487] = 610736260
mem[54173] = 453
mem[55144] = 2748104
mem[52466] = 6109568
mem[31890] = 3977366
mask = 01011001110000X101100X00X00X10010000
mem[64336] = 3971537
mem[60265] = 85267
mem[24597] = 7455656
mem[34924] = 703390248
mem[40391] = 328312
mem[49255] = 1117186
mask = 110X0100101100X1011010101X0X11X11010
mem[31313] = 789405
mem[7934] = 1803
mem[36190] = 1836611
mask = X0010010010010101X1X1X1010X111X010XX
mem[4017] = 64210
mem[40696] = 58930789
mem[18166] = 195479433
mem[41257] = 40207
mem[40948] = 1058796
mem[30803] = 486
mem[29709] = 72337
mask = 000X101000X110X001X00110X1X0011X0XX1
mem[11077] = 1653
mem[2376] = 77389
mem[19561] = 4876923
mem[32851] = 538156
mem[38532] = 1110
mask = X101101011X010111110X0111001X101010X
mem[44618] = 13980
mem[10366] = 711247
mem[4942] = 74171
mem[25306] = 350133
mem[21409] = 27748
mask = 00011010X1001010XXX0001110000001011X
mem[5809] = 1082
mem[36908] = 180
mem[59172] = 196430412
mem[60137] = 1388
mem[49643] = 1887
mask = 01011010X10000X1111111111XX00101111X
mem[56344] = 1237
mem[23638] = 37922654
mem[20307] = 593227321`;


/***/ }),

/***/ "/nKI":
/*!****************************************!*\
  !*** ./src/app/solution-code/day12.ts ***!
  \****************************************/
/*! exports provided: dayTwelvePartTwo, dayTwelveInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayTwelvePartTwo", function() { return dayTwelvePartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayTwelveInput", function() { return dayTwelveInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayTwelvePartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const operationRegex = /([NSEWLRF])(\d+)/;
    const operations = fileReader.readLineByLine((line) => {
        const match = line.match(operationRegex);
        if (!match)
            throw new Error('Line did not match regex');
        const direction = match[1];
        const amount = Number(match[2]);
        return { direction, amount };
    });
    const ship = {
        direction: 'E',
        coordinates: { x: 0, y: 0 },
    };
    const waypoint = {
        x: 10,
        y: 1,
    };
    function turn(degrees) {
        const radians = (degrees * Math.PI) / 180;
        const oldWaypoint = { x: waypoint.x, y: waypoint.y };
        waypoint.x = Math.round(oldWaypoint.x * Math.cos(radians) + oldWaypoint.y * Math.sin(radians));
        waypoint.y = Math.round(-oldWaypoint.x * Math.sin(radians) + oldWaypoint.y * Math.cos(radians));
    }
    function moveDirection(direction, amount) {
        switch (direction) {
            case 'N':
                waypoint.y += amount;
                break;
            case 'E':
                waypoint.x += amount;
                break;
            case 'S':
                waypoint.y -= amount;
                break;
            case 'W':
                waypoint.x -= amount;
                break;
            case 'F':
                ship.coordinates.x += amount * waypoint.x;
                ship.coordinates.y += amount * waypoint.y;
                break;
            case 'R':
                turn(amount);
                break;
            case 'L':
                turn(360 - amount);
                break;
            default:
                const unused = direction;
                throw new Error(unused);
        }
    }
    /**
     *        +y
     *        |
     *  -x ---|---- +x
     *        |
     *       -y
     */
    for (const { direction, amount } of operations) {
        moveDirection(direction, amount);
    }
    return Math.abs(ship.coordinates.x) + Math.abs(ship.coordinates.y);
}
const dayTwelveInput = `F12
W1
N3
E3
W3
F93
N2
R90
N4
L180
F13
E2
R270
F16
S4
L90
E1
S4
R180
L90
S2
F89
S3
R90
W1
F2
S2
W3
R180
N2
F41
E3
F74
E1
F20
W3
F32
E1
R90
F19
S4
E1
F41
L180
S1
L90
E5
L90
W2
F45
R180
F17
S3
E2
S1
F27
N5
R180
S1
E5
N1
L270
F60
L180
F18
N2
R180
E4
S4
L180
S5
L270
S1
F32
S5
F83
N2
R180
W1
L180
E2
S3
F94
N3
F82
L90
N2
W5
R180
S4
W3
E1
F81
S3
F45
R90
F51
R180
N1
W5
L90
E3
N5
E3
R180
N3
R180
F87
E4
R90
E4
L180
E4
R90
N1
L270
N3
E3
E3
L180
N1
W5
N3
F85
N1
E2
S3
L90
E5
N3
N1
F74
W2
F79
S1
L90
W5
F88
W4
N1
R180
F94
L90
W5
F79
R180
R270
N3
F83
W3
N3
L90
F33
S5
F93
L90
S1
W3
F24
L90
F80
S2
F86
F7
R90
E1
S3
W3
F23
R90
S1
W4
R90
N4
R270
S1
E1
F20
L270
F31
S2
L180
F41
E3
L90
N3
E3
N1
E5
F27
S3
W2
L90
E5
S1
F9
S3
E2
R90
S5
E2
R180
E3
F32
E3
S1
W1
F39
N4
F5
E5
F26
W4
S1
F54
S5
R90
F50
W4
S1
L90
S5
L90
F2
E5
L90
N1
W3
F75
L90
F85
S2
W4
F93
S4
E3
S2
E4
R90
S3
W1
F94
R90
N3
R270
S2
W3
N5
F1
S1
F32
E2
F17
N4
W2
S4
L90
W2
N2
L180
F94
R90
F78
N3
E3
N3
E4
F37
E5
L180
W2
L180
N2
R270
S2
F28
R90
S1
F15
E1
F50
N3
R90
F14
N4
F80
L90
S5
W1
L90
W5
F100
N1
L90
N5
W2
N1
F76
L180
S3
L180
E1
E5
F1
R90
W4
F95
S2
R90
W2
F29
W2
F47
W5
S5
W4
F58
L90
F22
N1
E4
N4
E2
S5
L180
W4
N2
W3
R90
F76
N1
F41
W5
F48
W1
N4
E2
R180
F79
N1
L90
S4
E2
F86
N2
E1
F5
W4
S2
L90
F3
R270
F43
L180
S5
R90
W5
R180
E4
S3
R90
S2
F41
F70
L270
E4
R90
F18
S4
F88
E2
L90
L270
F56
L90
N1
L90
F7
S3
F36
L90
F2
L90
F2
W4
S4
L90
E5
N2
L90
S4
R90
W1
R90
N2
E3
W2
S4
E4
R90
N5
L90
N4
F55
N3
E1
F80
W2
R90
S2
L90
W5
R90
R90
F87
L270
S5
R270
N5
E5
F10
E1
R180
N1
L90
S3
W1
F18
R90
S3
F89
L90
F42
S3
R180
F92
L90
F48
F11
W2
L180
F27
L180
N3
W1
S2
L90
W1
N1
W4
N1
R90
S2
W5
E1
F74
L180
F48
W3
F3
E3
F74
L270
F38
R180
N2
F83
S1
F78
L90
N4
F43
W3
W2
N1
L90
N2
W4
L90
S5
E5
W1
F83
E5
F70
N2
L90
N2
F66
S2
E2
R90
N1
F2
L90
F15
W3
F10
R90
N3
E5
N5
F57
R90
W2
F83
F91
W5
N2
R90
E4
S2
L90
N2
R90
S1
F49
L90
E3
L180
E2
F98
S1
R180
F23
N2
E2
F8
N2
L90
E2
N4
R90
F29
L90
E5
S3
F92
S5
F68
N1
L90
S5
F73
W4
L180
S1
R180
F74
R90
F27
R180
R90
F88
R270
S1
W1
F73
W1
S5
L90
N5
R90
F50
E2
R90
W3
F23
L90
W2
N1
E2
N2
F56
L90
F22
E5
F46
S2
L180
E4
R90
F10
W2
R90
E5
L270
S4
F55
R90
F17
R90
F8
L180
F25
E4
S2
E1
S1
F35
N5
W5
N3
F79
N1
R90
E1
F32
R90
F87
N2
R180
L180
F38
L90
S1
L270
S5
F63
L180
F50
W1
F23
S2
E2
F30
E3
L90
F79
R180
F90
L180
F81
R90
F72
R180
E4
N3
W3
R90
E5
R90
F81
S3
F66
S5
F83
L90
F15
N5
F16
L270
S3
L270
S3
L90
N5
E2
F60
W2
S4
E1
R180
W2
F28
W4
R90
N3
W3
F48
W2
S5
F2
R90
F47
S5
F11
S5
E2
N2
F93
S2
E4
F23
E4
S1
L90
F87
L180
N4
W5
N5
R180
R90
S5
F65
E5
F51
E5
F65
L90
S4
W3
L180
W1
W2
E4
R270
N4
F86
R90
L90
F9
F76
N4
E4
N4
R90
F40
E5
S1
W3
F22
W2
L90
F51
W1
E1
S2
F27
S5
R90
R270
R90
F71
R90
W4
R90
W1
N4
L90
E2
E1
F61
W1
S5
E2
E4
F10
L90
N2
F3
R90
F7
L90
F56
N1
R270
F70
F71
N3
F96
R90
F56
S4
F96
S5
W5
N4
E2
F90
S5
R180
F81
E1
N4
L90
S2
L180
E5
R90
S4
F60
S4
W3
F3
E5
F54`;


/***/ }),

/***/ "0VM2":
/*!********************************************!*\
  !*** ./src/app/solution-code/generated.ts ***!
  \********************************************/
/*! exports provided: generated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generated", function() { return generated; });
/**
 * Do not edit! This is auto generated code!
 */
const generated = {
    "day01__dayOnePartTwo": "",
    "day02__dayTwoPartTwo": "",
    "day03__dayThreePartTwo": "",
    "day04__dayFourPartTwo": "",
    "day05__dayFivePartTwo": "",
    "day06__daySixPartTwo": "",
    "day07__daySevenPartTwo": "",
    "day08__dayEightPartTwo": "",
    "day09__dayNinePartTwo": "",
    "day10__dayTenPartTwo": "",
    "day12__dayTwelvePartTwo": "",
    "day14__dayFourteenPartTwo": "",
    "day15__dayFifteenPartOne": "",
    "day15__dayFifteenPartTwo": "",
    "day16__daySixteenPartOne": "",
    "day16__daySixteenPartTwo": "",
    "day17__daySeventeenPartOne": "",
    "day18__dayEighteenPartOne": "",
    "day18__dayEighteenPartTwo": ""
};


/***/ }),

/***/ "1gWZ":
/*!****************************************!*\
  !*** ./src/app/solution-code/day10.ts ***!
  \****************************************/
/*! exports provided: dayTenPartTwo, dayTenInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayTenPartTwo", function() { return dayTenPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayTenInput", function() { return dayTenInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayTenPartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const jolts = fileReader.readLineByLine(Number);
    jolts.sort((left, right) => left - right);
    // Add the charing outlet
    jolts.unshift(0);
    // add the device jolt
    jolts.push(jolts[jolts.length - 1] + 3);
    const amountOfOptionsFromIndex = new Map();
    for (let i = jolts.length - 1; i >= 0; i--) {
        const iValue = jolts[i];
        let optionCount = 0;
        for (let j = i + 1; j < jolts.length; j++) {
            const jValue = jolts[j];
            if (jValue - iValue > 3)
                break;
            const existingOptions = amountOfOptionsFromIndex.get(j);
            if (existingOptions)
                optionCount += existingOptions;
            else
                optionCount++;
        }
        amountOfOptionsFromIndex.set(i, optionCount);
    }
    return amountOfOptionsFromIndex.get(0);
}
const dayTenInput = `67
118
90
41
105
24
137
129
124
15
59
91
94
60
108
63
112
48
62
125
68
126
131
4
1
44
77
115
75
89
7
3
82
28
97
130
104
54
40
80
76
19
136
31
98
110
133
84
2
51
18
70
12
120
47
66
27
39
109
61
34
121
38
96
30
83
69
13
81
37
119
55
20
87
95
29
88
111
45
46
14
11
8
74
101
73
56
132
23`;


/***/ }),

/***/ "4lY0":
/*!****************************************!*\
  !*** ./src/app/solution-code/day07.ts ***!
  \****************************************/
/*! exports provided: daySevenPartTwo, daySevenInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySevenPartTwo", function() { return daySevenPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySevenInput", function() { return daySevenInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function daySevenPartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const lineMatcher = /^([a-z]+) ([a-z]+) bags contain (.*)\.$/;
    const inventoryMatcher = /^(\d+) ([a-z]+) ([a-z]+) bags?$/;
    class Bag {
        constructor(bagType, contents) {
            this.bagType = bagType;
            this.contents = contents;
        }
    }
    function bagName(prefix, color) {
        return `${prefix} ${color}`;
    }
    const bags = fileReader.readLineByLine((line) => {
        const match = line.match(lineMatcher);
        if (!match)
            throw new Error(`line dit not match\n${line}`);
        const [, bagPrefix, bagPostFix, inventory] = match;
        if (inventory === 'no other bags') {
            return new Bag(bagName(bagPrefix, bagPostFix), {});
        }
        const inventoryItemsAsString = inventory.split(', ');
        const inventoryItems = inventoryItemsAsString.reduce((prev, next) => {
            const inventoryMatch = next.match(inventoryMatcher);
            if (!inventoryMatch)
                throw new Error(`Inventroy did not match\n${next}`);
            const [, amount, bagPrefix, colorName] = inventoryMatch;
            const name = bagName(bagPrefix, colorName);
            prev[name] = Number(amount);
            return prev;
        }, {});
        return new Bag(bagName(bagPrefix, bagPostFix), inventoryItems);
    });
    const bagsMap = new Map(bags.map((bag) => [bag.bagType, bag]));
    function containsShinyGoldBag(bag, bagType = 'shiny gold') {
        if (bagType in bag.contents)
            return true;
        return Object.keys(bag.contents).some((innerBag) => {
            const inventoryBag = bagsMap.get(innerBag);
            if (!inventoryBag)
                throw new Error(`Did not manage to find bag\n${innerBag}`);
            return containsShinyGoldBag(inventoryBag, bagType);
        });
    }
    function countContents(bag) {
        let sum = 0;
        for (const [inventoryBagName, amount] of Object.entries(bag.contents)) {
            const inventoryBag = bagsMap.get(inventoryBagName);
            if (!inventoryBag)
                throw new Error(`Did not manage to find bag\n${inventoryBagName}`);
            sum += amount + amount * countContents(inventoryBag);
        }
        return sum;
    }
    const bagsWithShinyGoldBag = bags.reduce((prev, next) => {
        if (containsShinyGoldBag(next)) {
            return prev + 1;
        }
        return prev;
    }, 0);
    return countContents(bagsMap.get('shiny gold'));
}
const daySevenInput = `clear purple bags contain 5 faded indigo bags, 3 muted purple bags.
bright teal bags contain 4 striped plum bags.
dim fuchsia bags contain 2 vibrant tomato bags, 2 dotted purple bags, 2 plaid indigo bags.
dark magenta bags contain 1 shiny aqua bag, 2 posh white bags.
dark chartreuse bags contain 1 dotted brown bag, 4 vibrant magenta bags.
wavy crimson bags contain 5 pale coral bags.
drab cyan bags contain 1 light green bag, 2 pale teal bags.
posh salmon bags contain 5 wavy maroon bags, 5 shiny coral bags.
light violet bags contain 5 faded teal bags, 1 light gray bag, 4 bright turquoise bags, 5 posh crimson bags.
dark turquoise bags contain 1 clear yellow bag, 1 wavy maroon bag, 3 muted brown bags.
bright coral bags contain 5 mirrored silver bags, 4 light teal bags.
dotted lavender bags contain 1 clear indigo bag.
striped white bags contain 5 dull beige bags.
dotted lime bags contain 5 mirrored magenta bags, 4 faded red bags.
dark tan bags contain 5 bright coral bags, 5 wavy salmon bags, 4 posh green bags.
dull black bags contain 2 shiny brown bags, 3 plaid bronze bags, 3 wavy teal bags, 3 dull chartreuse bags.
wavy coral bags contain 5 clear maroon bags, 3 dotted tan bags.
dotted yellow bags contain 1 shiny green bag, 1 mirrored tomato bag, 5 light bronze bags.
striped tan bags contain 3 pale lime bags.
striped aqua bags contain 5 pale magenta bags, 4 drab magenta bags, 2 dotted violet bags.
drab crimson bags contain 4 posh aqua bags, 4 dim gray bags.
bright indigo bags contain 5 striped violet bags, 1 muted orange bag.
striped yellow bags contain 3 mirrored orange bags, 3 clear black bags, 1 pale magenta bag.
dim teal bags contain 1 drab gold bag.
light green bags contain 4 drab magenta bags, 3 dark orange bags.
posh white bags contain 1 clear teal bag, 3 shiny cyan bags.
wavy fuchsia bags contain 5 vibrant magenta bags, 2 dull maroon bags, 4 faded lime bags.
faded gold bags contain 3 shiny indigo bags, 4 light lime bags.
dotted violet bags contain 4 faded tomato bags, 3 shiny gold bags, 4 faded brown bags, 2 clear bronze bags.
posh olive bags contain 2 pale bronze bags.
mirrored salmon bags contain 3 dim crimson bags, 5 striped plum bags, 5 clear plum bags.
mirrored olive bags contain 4 bright orange bags, 5 dim silver bags, 1 wavy tan bag, 5 striped crimson bags.
shiny orange bags contain 2 dim lime bags, 4 plaid lavender bags, 5 dull indigo bags.
dark fuchsia bags contain 4 dull red bags, 1 dotted fuchsia bag.
wavy white bags contain 5 plaid tomato bags, 5 wavy indigo bags, 5 mirrored brown bags, 3 muted red bags.
plaid violet bags contain 2 faded beige bags, 2 muted gold bags, 4 posh brown bags.
light orange bags contain 2 light tomato bags, 3 clear plum bags.
shiny tan bags contain 5 plaid tan bags, 2 wavy red bags, 1 wavy green bag.
dim gold bags contain 1 dull orange bag.
dark gold bags contain 1 pale cyan bag, 5 dotted beige bags, 3 vibrant teal bags, 1 vibrant magenta bag.
striped tomato bags contain 3 faded white bags, 4 shiny beige bags, 1 bright violet bag, 4 plaid aqua bags.
shiny magenta bags contain 5 dark purple bags, 1 dotted green bag, 2 shiny tomato bags.
plaid tomato bags contain 4 bright coral bags, 1 clear teal bag.
pale turquoise bags contain 3 muted gold bags, 3 dark bronze bags, 5 dotted violet bags, 5 light tomato bags.
shiny silver bags contain 5 pale purple bags, 1 muted maroon bag.
drab brown bags contain 3 dotted yellow bags, 3 wavy maroon bags, 3 striped gold bags, 1 faded aqua bag.
striped olive bags contain 5 bright crimson bags, 5 dim olive bags, 2 pale coral bags, 2 dull orange bags.
plaid gray bags contain 2 dim yellow bags, 5 faded lime bags.
striped violet bags contain 5 shiny gray bags, 1 dim lime bag.
wavy chartreuse bags contain 3 striped magenta bags, 4 muted crimson bags, 5 clear maroon bags.
plaid salmon bags contain 2 bright black bags.
mirrored teal bags contain 1 vibrant crimson bag, 5 plaid magenta bags, 2 muted green bags, 4 wavy brown bags.
drab yellow bags contain 2 posh salmon bags, 3 light purple bags, 3 striped orange bags.
bright purple bags contain 5 muted gold bags, 3 dull olive bags, 5 faded violet bags.
dim magenta bags contain 5 dark olive bags, 2 shiny indigo bags, 5 shiny turquoise bags, 5 dark tan bags.
wavy violet bags contain 5 clear white bags, 5 posh coral bags.
wavy blue bags contain 4 pale chartreuse bags, 2 shiny brown bags.
plaid crimson bags contain 4 faded black bags.
vibrant tomato bags contain 3 posh tomato bags, 2 mirrored silver bags, 5 dotted brown bags.
clear indigo bags contain 1 wavy indigo bag.
mirrored fuchsia bags contain 2 vibrant coral bags, 5 clear tan bags, 2 pale indigo bags, 1 drab bronze bag.
light silver bags contain 5 pale plum bags, 5 clear black bags, 1 pale red bag.
dim tan bags contain 1 pale plum bag.
pale salmon bags contain 4 dim lime bags.
light lime bags contain 1 bright fuchsia bag, 1 bright olive bag.
dim red bags contain 5 clear silver bags.
striped chartreuse bags contain 5 dim chartreuse bags, 3 pale cyan bags.
bright gray bags contain 2 posh teal bags, 1 dark turquoise bag, 4 light yellow bags.
wavy gold bags contain 5 drab white bags, 2 wavy salmon bags, 5 dim lime bags, 4 plaid tomato bags.
pale maroon bags contain 3 vibrant magenta bags, 5 dim maroon bags, 4 dull aqua bags, 5 bright coral bags.
shiny aqua bags contain 5 dotted brown bags.
dark tomato bags contain 5 dull violet bags, 1 vibrant magenta bag, 3 muted brown bags.
faded aqua bags contain 1 bright fuchsia bag, 5 dotted violet bags, 4 shiny gold bags.
dark plum bags contain 5 dull aqua bags, 3 faded red bags.
plaid aqua bags contain 3 drab gold bags, 3 faded tomato bags, 5 plaid cyan bags.
faded teal bags contain 1 vibrant beige bag, 5 posh crimson bags.
muted coral bags contain 1 dim plum bag, 1 wavy salmon bag, 5 plaid cyan bags.
posh gray bags contain 3 posh tomato bags.
plaid black bags contain 4 faded aqua bags.
wavy gray bags contain 1 shiny blue bag.
shiny maroon bags contain 2 wavy crimson bags, 1 dotted coral bag, 3 bright tan bags.
mirrored lime bags contain 5 plaid purple bags.
dotted chartreuse bags contain 5 light salmon bags.
vibrant gold bags contain 5 plaid purple bags, 3 bright olive bags, 5 vibrant yellow bags.
wavy yellow bags contain 3 light tomato bags.
drab violet bags contain 2 light violet bags, 1 vibrant tomato bag, 3 dim bronze bags, 5 striped lavender bags.
pale lime bags contain 3 striped blue bags, 3 shiny indigo bags, 5 posh gold bags.
light lavender bags contain 2 faded chartreuse bags, 3 dim lime bags, 4 faded brown bags.
mirrored chartreuse bags contain 5 dotted violet bags, 2 faded brown bags.
clear beige bags contain 4 faded violet bags, 3 clear white bags, 5 plaid indigo bags, 2 wavy indigo bags.
dull lime bags contain 4 plaid black bags, 5 pale bronze bags, 1 bright plum bag.
muted violet bags contain 4 drab white bags, 4 muted silver bags, 4 dotted bronze bags.
faded white bags contain 4 plaid olive bags.
striped teal bags contain 2 drab crimson bags, 3 clear maroon bags, 4 muted blue bags, 2 posh green bags.
dull teal bags contain 5 wavy yellow bags.
wavy maroon bags contain 2 mirrored salmon bags, 2 light teal bags, 5 posh gray bags, 3 muted olive bags.
vibrant salmon bags contain 3 light turquoise bags, 4 striped maroon bags, 3 mirrored white bags, 2 bright olive bags.
striped green bags contain 5 faded gray bags, 2 pale green bags, 4 posh blue bags.
posh tan bags contain 4 clear salmon bags.
wavy green bags contain 1 vibrant plum bag, 1 muted crimson bag, 4 light teal bags, 2 mirrored salmon bags.
dotted white bags contain 3 plaid teal bags, 1 shiny indigo bag.
muted tomato bags contain 4 pale gray bags, 5 wavy red bags, 5 dark violet bags, 3 posh aqua bags.
drab beige bags contain 5 wavy aqua bags.
pale purple bags contain 4 striped black bags, 1 light turquoise bag.
muted indigo bags contain 5 dim gold bags, 2 dull turquoise bags, 4 dotted olive bags.
pale coral bags contain 2 vibrant beige bags.
dark beige bags contain 5 pale turquoise bags.
posh crimson bags contain 5 dark aqua bags, 3 posh teal bags, 5 dull aqua bags.
dim purple bags contain 5 drab crimson bags, 3 pale aqua bags, 5 clear orange bags.
shiny teal bags contain 4 shiny tan bags, 2 striped salmon bags, 5 drab lime bags.
muted crimson bags contain no other bags.
plaid green bags contain 3 pale bronze bags.
dim aqua bags contain 2 light lime bags, 4 posh green bags, 5 clear white bags.
plaid lavender bags contain 2 striped lime bags.
dark olive bags contain 1 drab magenta bag, 1 bright magenta bag, 2 plaid crimson bags.
striped crimson bags contain 2 vibrant white bags, 1 pale bronze bag, 2 striped blue bags, 4 pale coral bags.
striped lime bags contain 3 shiny gold bags, 1 muted coral bag, 3 dotted red bags.
plaid silver bags contain 2 drab aqua bags, 2 striped orange bags, 2 plaid crimson bags.
dotted tan bags contain 3 light purple bags, 1 clear teal bag, 5 dotted crimson bags, 2 dim lime bags.
clear blue bags contain 5 dotted green bags, 5 drab crimson bags, 2 wavy tomato bags.
muted green bags contain 3 clear maroon bags, 5 dull orange bags.
dull blue bags contain 3 light silver bags.
striped purple bags contain 4 vibrant tomato bags, 1 dark bronze bag, 1 mirrored white bag.
light salmon bags contain 3 muted coral bags, 1 mirrored yellow bag, 4 faded red bags, 3 muted silver bags.
wavy black bags contain 5 clear indigo bags, 4 dotted purple bags, 3 posh violet bags, 4 bright magenta bags.
mirrored crimson bags contain 3 muted gray bags, 5 drab chartreuse bags.
vibrant bronze bags contain 1 mirrored turquoise bag, 3 dull crimson bags, 3 faded purple bags, 5 dotted beige bags.
pale teal bags contain 5 clear green bags.
muted red bags contain 3 dim plum bags, 3 clear bronze bags.
mirrored aqua bags contain 2 posh aqua bags, 1 plaid tomato bag, 1 mirrored magenta bag, 4 dim chartreuse bags.
dim yellow bags contain 5 bright fuchsia bags, 5 drab tan bags, 1 dark blue bag.
vibrant green bags contain 3 dull aqua bags, 2 posh cyan bags.
mirrored black bags contain 2 striped gray bags.
striped turquoise bags contain 1 shiny gold bag, 4 shiny turquoise bags.
wavy plum bags contain 4 pale brown bags, 4 dark plum bags, 1 bright lavender bag.
dotted purple bags contain 2 dim maroon bags.
posh teal bags contain 1 clear plum bag, 4 faded black bags, 1 dim crimson bag.
shiny crimson bags contain 1 faded red bag.
mirrored beige bags contain 1 faded bronze bag.
dotted olive bags contain 5 pale plum bags, 4 muted plum bags.
bright lime bags contain 3 faded beige bags, 3 wavy fuchsia bags, 3 vibrant plum bags, 3 shiny coral bags.
pale bronze bags contain 5 faded crimson bags, 4 vibrant tan bags, 2 pale coral bags.
dim coral bags contain 5 drab maroon bags, 4 striped violet bags, 1 plaid crimson bag, 2 dim white bags.
bright violet bags contain 5 clear white bags, 1 plaid beige bag.
plaid gold bags contain 2 striped maroon bags.
dull red bags contain 4 wavy tomato bags, 5 clear beige bags.
muted tan bags contain 3 pale beige bags, 4 dotted beige bags, 5 dull cyan bags, 1 striped gold bag.
posh plum bags contain 3 vibrant purple bags, 2 light tomato bags, 3 drab maroon bags, 3 plaid tomato bags.
dotted gold bags contain 1 posh violet bag, 4 dim purple bags, 3 shiny tomato bags.
posh black bags contain 1 muted olive bag, 5 striped turquoise bags, 1 wavy crimson bag.
shiny beige bags contain 2 dull teal bags, 3 striped lavender bags, 3 vibrant indigo bags, 3 mirrored magenta bags.
posh silver bags contain 1 wavy black bag.
dotted bronze bags contain 3 dim plum bags, 1 posh gray bag, 5 mirrored crimson bags, 5 mirrored lime bags.
pale indigo bags contain 2 wavy black bags, 4 shiny aqua bags, 1 striped lime bag.
muted olive bags contain 4 faded brown bags, 1 muted gold bag, 1 faded teal bag, 2 vibrant orange bags.
shiny white bags contain 2 wavy purple bags.
bright yellow bags contain 5 dotted gray bags, 5 clear indigo bags, 2 clear turquoise bags.
pale tan bags contain 5 dotted purple bags, 1 vibrant white bag, 3 pale red bags, 3 mirrored yellow bags.
drab gray bags contain 5 dotted maroon bags, 3 shiny fuchsia bags, 5 dim lime bags, 3 mirrored brown bags.
drab blue bags contain 4 striped purple bags, 3 plaid tomato bags.
posh indigo bags contain 3 muted blue bags.
dotted turquoise bags contain 1 vibrant plum bag, 5 clear gray bags, 2 wavy yellow bags.
light red bags contain 2 muted silver bags, 5 drab chartreuse bags, 4 wavy cyan bags.
drab red bags contain 3 dotted tomato bags, 3 dotted plum bags, 5 drab orange bags, 4 wavy teal bags.
dotted beige bags contain 5 light violet bags.
clear gray bags contain 3 shiny gold bags, 3 dull orange bags, 5 light fuchsia bags, 5 vibrant beige bags.
vibrant beige bags contain 2 drab magenta bags, 5 dim maroon bags, 3 bright turquoise bags, 3 dim plum bags.
dark brown bags contain 2 striped cyan bags, 5 vibrant yellow bags.
bright blue bags contain 4 vibrant lime bags, 4 faded yellow bags, 1 clear orange bag, 4 wavy gray bags.
dull plum bags contain 3 mirrored salmon bags.
striped gold bags contain 1 faded teal bag, 4 vibrant plum bags.
dotted gray bags contain 1 faded black bag, 1 pale tomato bag.
plaid olive bags contain 2 clear gray bags, 5 dotted tan bags.
faded plum bags contain 4 light turquoise bags, 1 dim brown bag, 3 shiny turquoise bags, 1 posh chartreuse bag.
clear turquoise bags contain 2 bright coral bags, 3 drab cyan bags.
wavy brown bags contain 5 clear yellow bags, 5 dim silver bags, 1 mirrored white bag.
muted maroon bags contain 3 posh aqua bags, 2 drab yellow bags, 3 pale crimson bags, 1 dotted maroon bag.
clear plum bags contain no other bags.
dim silver bags contain 1 bright fuchsia bag.
dotted silver bags contain 2 dotted indigo bags, 2 faded chartreuse bags, 3 wavy white bags.
vibrant olive bags contain 3 posh coral bags, 3 drab aqua bags.
faded yellow bags contain 1 plaid tomato bag, 1 light tomato bag.
drab lavender bags contain 3 light gray bags, 3 dotted beige bags, 4 dull tomato bags.
drab tomato bags contain 4 wavy aqua bags, 1 posh teal bag, 5 clear red bags, 4 clear plum bags.
pale beige bags contain 5 wavy salmon bags.
pale magenta bags contain 5 bright fuchsia bags.
dotted black bags contain 3 mirrored lime bags.
bright plum bags contain 5 vibrant teal bags.
bright lavender bags contain 5 dotted purple bags, 1 faded black bag, 4 light purple bags.
muted yellow bags contain 4 dotted aqua bags, 1 dim cyan bag.
shiny tomato bags contain 1 dim crimson bag.
dotted magenta bags contain 2 clear maroon bags, 5 plaid gold bags.
dull aqua bags contain 2 shiny blue bags.
faded silver bags contain 4 faded brown bags, 1 muted brown bag.
muted gray bags contain 2 light yellow bags, 5 mirrored brown bags, 3 bright teal bags, 5 posh teal bags.
mirrored gold bags contain 4 shiny black bags, 5 shiny coral bags, 2 clear orange bags, 4 mirrored aqua bags.
plaid teal bags contain 4 dull orange bags, 2 shiny gold bags, 2 plaid crimson bags, 4 clear green bags.
light white bags contain 5 vibrant white bags, 1 posh lavender bag, 3 clear white bags.
shiny turquoise bags contain 3 bright turquoise bags.
muted orange bags contain 1 bright tan bag, 1 shiny teal bag, 5 bright gold bags.
mirrored bronze bags contain 2 drab white bags, 4 clear bronze bags, 3 drab blue bags.
shiny green bags contain 4 mirrored cyan bags.
posh tomato bags contain 3 dull orange bags, 2 clear plum bags.
shiny salmon bags contain 2 vibrant tomato bags, 3 muted olive bags, 2 dim bronze bags.
muted purple bags contain 4 shiny turquoise bags.
dim lime bags contain 3 posh teal bags.
muted chartreuse bags contain 1 dotted fuchsia bag, 4 light teal bags, 4 dull salmon bags.
mirrored yellow bags contain 4 wavy brown bags.
drab teal bags contain 1 mirrored maroon bag, 1 faded fuchsia bag, 3 bright coral bags, 2 dull purple bags.
plaid plum bags contain 4 dark cyan bags.
dim indigo bags contain 3 dotted gold bags, 5 muted coral bags, 2 posh plum bags.
wavy aqua bags contain 4 drab gold bags, 5 wavy yellow bags.
vibrant brown bags contain 3 posh violet bags, 4 pale magenta bags.
faded maroon bags contain 4 dull maroon bags, 4 light indigo bags, 4 wavy beige bags, 1 clear olive bag.
light crimson bags contain 1 dim gray bag.
plaid orange bags contain 5 plaid bronze bags, 1 dark orange bag.
clear gold bags contain 5 plaid black bags, 4 faded coral bags.
mirrored gray bags contain 1 shiny coral bag, 3 pale beige bags, 1 dark tan bag.
dark gray bags contain 4 dim turquoise bags, 3 clear gray bags.
light fuchsia bags contain 3 dotted brown bags, 3 clear maroon bags.
posh cyan bags contain 2 dotted violet bags.
light cyan bags contain 2 drab maroon bags, 5 vibrant indigo bags, 3 dull tomato bags, 3 wavy gray bags.
wavy olive bags contain 5 wavy cyan bags, 4 mirrored tomato bags.
faded indigo bags contain 4 bright bronze bags, 5 dim lime bags.
muted plum bags contain 1 clear maroon bag.
muted brown bags contain 2 posh gray bags.
pale tomato bags contain 3 dull cyan bags, 3 faded beige bags.
striped blue bags contain 1 faded tomato bag, 3 dotted purple bags.
dotted fuchsia bags contain 2 posh green bags, 1 faded aqua bag.
vibrant fuchsia bags contain 3 mirrored white bags.
pale cyan bags contain 3 dotted green bags, 3 drab maroon bags.
wavy silver bags contain 1 vibrant yellow bag, 5 mirrored chartreuse bags, 1 drab magenta bag, 2 faded tan bags.
vibrant black bags contain 3 dotted purple bags, 3 bright coral bags.
dull bronze bags contain 5 dull white bags, 4 dark olive bags.
wavy purple bags contain 2 dim lavender bags, 5 striped red bags, 4 posh yellow bags, 1 dotted fuchsia bag.
dim salmon bags contain 3 vibrant magenta bags, 4 wavy fuchsia bags, 1 plaid fuchsia bag, 2 dim magenta bags.
dim orange bags contain 2 muted lime bags.
plaid fuchsia bags contain 1 vibrant crimson bag, 1 dotted beige bag, 5 wavy gray bags, 1 dim bronze bag.
dark black bags contain 2 posh lavender bags, 4 light black bags, 5 bright orange bags.
muted teal bags contain 5 clear red bags, 4 vibrant magenta bags, 1 vibrant aqua bag.
mirrored lavender bags contain 1 faded bronze bag, 2 bright violet bags, 4 dull turquoise bags.
dark lavender bags contain 5 dotted gold bags, 2 dark turquoise bags, 1 dark brown bag.
dull brown bags contain 2 faded brown bags, 3 dotted lime bags, 5 dull plum bags, 3 dull white bags.
pale gray bags contain 1 pale salmon bag, 5 dotted fuchsia bags.
light coral bags contain 2 bright magenta bags, 1 wavy brown bag.
dull tan bags contain 5 shiny turquoise bags, 5 light cyan bags, 2 faded indigo bags.
dim bronze bags contain 5 striped blue bags.
bright tomato bags contain 1 striped black bag.
shiny chartreuse bags contain 4 plaid aqua bags, 1 striped tomato bag, 3 striped black bags, 4 dull maroon bags.
mirrored silver bags contain 4 shiny blue bags, 4 dotted maroon bags, 3 clear maroon bags, 4 clear plum bags.
pale olive bags contain 5 drab brown bags, 1 bright lime bag, 1 vibrant lime bag, 3 muted blue bags.
pale gold bags contain 1 mirrored chartreuse bag, 4 posh silver bags.
plaid indigo bags contain 1 bright fuchsia bag, 1 wavy indigo bag, 5 dark aqua bags.
mirrored green bags contain 4 mirrored crimson bags, 2 dull turquoise bags.
shiny fuchsia bags contain 4 wavy crimson bags.
drab salmon bags contain 1 faded silver bag, 4 muted white bags, 4 clear yellow bags.
bright salmon bags contain 4 bright crimson bags, 1 muted tomato bag.
posh chartreuse bags contain 3 posh cyan bags, 4 plaid cyan bags.
wavy cyan bags contain 1 vibrant magenta bag, 2 posh crimson bags.
shiny indigo bags contain 1 plaid teal bag.
shiny purple bags contain 1 dark purple bag, 5 dull magenta bags, 3 plaid fuchsia bags.
bright gold bags contain 3 faded aqua bags.
vibrant yellow bags contain 3 vibrant brown bags, 3 wavy green bags, 5 dotted brown bags, 5 striped plum bags.
muted beige bags contain 4 vibrant tomato bags, 3 dull fuchsia bags.
dim maroon bags contain no other bags.
mirrored tan bags contain 3 pale turquoise bags, 3 muted olive bags, 3 shiny violet bags.
striped gray bags contain 5 mirrored gold bags.
drab purple bags contain 1 wavy orange bag.
dull silver bags contain 4 clear chartreuse bags, 4 posh cyan bags, 2 pale salmon bags, 3 shiny lavender bags.
dim blue bags contain 1 clear turquoise bag, 1 clear orange bag, 4 clear teal bags.
dull maroon bags contain 2 striped plum bags.
posh magenta bags contain 4 dim gray bags.
light beige bags contain 4 dotted turquoise bags, 1 pale cyan bag.
dim olive bags contain 3 plaid teal bags, 5 faded brown bags, 1 faded crimson bag.
light tomato bags contain no other bags.
drab black bags contain 2 wavy brown bags, 1 dull maroon bag, 5 muted crimson bags, 3 posh green bags.
posh coral bags contain 1 drab gray bag, 1 striped red bag.
mirrored cyan bags contain 4 drab gray bags.
dotted salmon bags contain 4 striped coral bags, 2 muted purple bags.
bright maroon bags contain 1 faded crimson bag, 4 clear maroon bags, 2 faded brown bags.
light turquoise bags contain 2 shiny lime bags, 5 dotted violet bags, 3 vibrant tan bags, 5 shiny cyan bags.
faded black bags contain 4 drab magenta bags, 3 dim plum bags, 5 bright fuchsia bags.
vibrant silver bags contain 2 clear violet bags, 2 drab orange bags, 5 plaid magenta bags, 5 shiny violet bags.
vibrant tan bags contain 3 clear bronze bags, 5 vibrant tomato bags, 4 light teal bags.
clear bronze bags contain 1 posh green bag, 4 faded brown bags, 1 shiny violet bag.
striped salmon bags contain 2 dark fuchsia bags, 4 shiny chartreuse bags.
wavy indigo bags contain no other bags.
dark violet bags contain 5 dull violet bags, 3 wavy tomato bags, 5 pale green bags.
drab magenta bags contain 4 wavy indigo bags, 2 dark aqua bags, 4 dotted brown bags, 2 muted crimson bags.
dark orange bags contain 3 faded violet bags, 3 shiny coral bags, 4 light violet bags.
drab green bags contain 1 light tan bag, 2 plaid tomato bags.
mirrored magenta bags contain 4 vibrant plum bags, 4 vibrant black bags.
muted cyan bags contain 1 dull aqua bag, 3 dark cyan bags.
dim plum bags contain 2 wavy yellow bags, 3 bright fuchsia bags.
dark bronze bags contain 2 shiny violet bags, 2 clear plum bags.
striped coral bags contain 3 shiny coral bags.
faded violet bags contain 4 plaid indigo bags.
posh brown bags contain 5 posh magenta bags, 5 bright fuchsia bags, 1 vibrant plum bag.
drab coral bags contain 5 vibrant beige bags.
plaid tan bags contain 5 dark orange bags, 5 dotted tan bags.
dark silver bags contain 1 pale plum bag, 5 bright cyan bags, 3 wavy aqua bags.
dark lime bags contain 3 drab green bags, 5 light crimson bags.
dull salmon bags contain 3 dull maroon bags, 5 striped gold bags, 2 dotted maroon bags.
bright white bags contain 5 pale teal bags, 2 posh white bags, 2 bright crimson bags, 3 pale fuchsia bags.
vibrant violet bags contain 5 dim brown bags, 2 bright brown bags, 2 pale coral bags, 1 wavy plum bag.
vibrant magenta bags contain 2 clear maroon bags, 3 wavy indigo bags, 5 plaid bronze bags.
faded coral bags contain 5 vibrant maroon bags, 3 mirrored beige bags.
dark teal bags contain 1 dark tan bag, 2 posh chartreuse bags.
dark crimson bags contain 2 dark fuchsia bags, 5 striped blue bags.
dull yellow bags contain 1 faded bronze bag, 4 dark beige bags, 5 plaid black bags, 1 posh salmon bag.
plaid magenta bags contain 1 plaid beige bag, 2 posh teal bags.
pale chartreuse bags contain 1 plaid orange bag, 2 vibrant beige bags, 5 muted gold bags.
posh lavender bags contain 3 plaid violet bags, 4 dark blue bags, 2 wavy teal bags, 5 vibrant black bags.
dull purple bags contain 2 posh lime bags, 1 wavy olive bag, 1 striped red bag, 5 pale lime bags.
bright tan bags contain 2 shiny tan bags, 4 clear green bags, 1 light violet bag.
pale plum bags contain 4 dull crimson bags, 2 vibrant orange bags, 2 striped cyan bags.
clear crimson bags contain 3 mirrored silver bags.
light blue bags contain 5 dull magenta bags, 4 clear black bags, 2 bright tan bags, 1 dotted teal bag.
muted turquoise bags contain 3 bright red bags, 3 light tomato bags, 3 dull gold bags, 4 clear cyan bags.
muted lime bags contain 5 dim olive bags, 3 pale fuchsia bags.
clear green bags contain 5 dim maroon bags, 4 bright fuchsia bags, 1 muted crimson bag, 1 shiny blue bag.
dim green bags contain 2 pale turquoise bags.
plaid red bags contain 3 plaid silver bags.
mirrored brown bags contain 1 clear plum bag.
dull lavender bags contain 1 clear teal bag.
shiny brown bags contain 5 shiny coral bags, 1 posh black bag, 2 dotted maroon bags, 2 muted olive bags.
dotted green bags contain 2 clear crimson bags, 2 dim gray bags, 1 plaid green bag, 1 dotted maroon bag.
vibrant maroon bags contain 2 mirrored brown bags, 5 shiny coral bags.
dotted tomato bags contain 3 wavy coral bags, 3 dotted crimson bags.
vibrant turquoise bags contain 5 posh tomato bags, 2 faded bronze bags.
bright aqua bags contain 4 light tan bags.
clear teal bags contain 1 mirrored salmon bag, 4 dark aqua bags.
shiny gray bags contain 3 mirrored crimson bags, 4 drab chartreuse bags.
muted black bags contain 4 wavy orange bags.
posh yellow bags contain 4 plaid teal bags.
pale black bags contain 5 wavy brown bags, 1 mirrored yellow bag.
dark red bags contain 5 striped magenta bags, 5 plaid salmon bags.
dull magenta bags contain 2 light white bags, 3 mirrored blue bags, 3 faded black bags, 5 shiny coral bags.
mirrored orange bags contain 5 posh white bags.
dark salmon bags contain 2 posh fuchsia bags.
bright brown bags contain 4 posh blue bags, 3 shiny brown bags.
drab lime bags contain 4 dotted maroon bags, 3 pale bronze bags, 2 striped black bags.
dull violet bags contain 5 bright lavender bags, 1 shiny coral bag.
muted silver bags contain 1 muted coral bag.
dull olive bags contain 4 pale cyan bags, 5 drab green bags, 4 clear turquoise bags.
light aqua bags contain 4 posh orange bags, 4 dull fuchsia bags.
vibrant coral bags contain 1 clear bronze bag, 3 striped brown bags.
muted magenta bags contain 1 clear fuchsia bag, 5 shiny crimson bags, 4 shiny gold bags, 2 plaid cyan bags.
faded blue bags contain 5 plaid green bags.
clear cyan bags contain 3 drab cyan bags.
wavy beige bags contain 4 mirrored white bags, 4 bright white bags, 5 dark beige bags, 5 pale tomato bags.
light maroon bags contain 3 vibrant maroon bags, 1 dark orange bag, 3 drab plum bags.
faded green bags contain 1 vibrant black bag.
vibrant teal bags contain 4 shiny violet bags.
clear coral bags contain 4 dark maroon bags, 1 striped tomato bag, 4 light orange bags.
pale lavender bags contain 4 light green bags, 2 drab magenta bags.
muted blue bags contain 5 pale cyan bags, 4 posh teal bags.
mirrored plum bags contain 5 drab aqua bags, 3 striped gold bags.
dull chartreuse bags contain 1 dull orange bag, 5 clear chartreuse bags.
faded magenta bags contain 4 bright blue bags.
dim cyan bags contain 1 muted brown bag, 3 posh magenta bags.
dim beige bags contain 3 shiny blue bags, 4 dim black bags.
faded tomato bags contain 1 vibrant magenta bag, 2 plaid cyan bags, 4 muted crimson bags.
clear aqua bags contain 1 dull bronze bag, 4 shiny bronze bags.
pale fuchsia bags contain 2 mirrored orange bags.
drab olive bags contain 3 wavy salmon bags.
clear white bags contain 1 vibrant teal bag, 1 posh tomato bag, 5 vibrant aqua bags.
drab orange bags contain 3 striped gold bags, 2 mirrored tan bags, 3 dull tomato bags, 2 wavy aqua bags.
plaid purple bags contain 3 dotted maroon bags, 5 shiny turquoise bags.
mirrored violet bags contain 4 clear white bags, 2 shiny black bags.
dotted teal bags contain 2 dim teal bags, 1 striped fuchsia bag.
bright beige bags contain 2 dim silver bags, 3 dull beige bags.
dim turquoise bags contain 1 plaid silver bag, 1 light yellow bag, 2 shiny orange bags, 3 striped cyan bags.
dotted brown bags contain no other bags.
drab maroon bags contain 4 clear plum bags, 4 shiny coral bags.
dark indigo bags contain 1 mirrored magenta bag.
posh bronze bags contain 3 bright bronze bags, 4 dotted maroon bags, 3 wavy tomato bags, 4 dotted lime bags.
vibrant cyan bags contain 5 wavy brown bags.
drab turquoise bags contain 2 muted silver bags, 2 bright maroon bags, 5 dim gray bags.
pale red bags contain 1 shiny coral bag, 5 mirrored silver bags, 3 shiny turquoise bags.
vibrant lime bags contain 4 light lavender bags, 4 mirrored tomato bags.
dim black bags contain 2 light beige bags, 1 plaid cyan bag, 2 posh yellow bags, 3 vibrant cyan bags.
dull coral bags contain 5 dull orange bags, 1 dotted green bag.
posh violet bags contain 5 light green bags, 3 pale teal bags.
bright silver bags contain 5 wavy white bags, 2 vibrant salmon bags.
light plum bags contain 4 light indigo bags, 1 posh gold bag.
plaid coral bags contain 4 dark olive bags.
bright magenta bags contain 1 bright fuchsia bag, 4 dim crimson bags, 2 clear yellow bags, 2 bright lavender bags.
striped lavender bags contain 4 dull orange bags.
drab aqua bags contain 4 vibrant tan bags, 3 vibrant crimson bags, 1 dotted purple bag.
shiny blue bags contain 2 plaid bronze bags.
wavy lime bags contain 2 drab orange bags.
dull white bags contain 4 light teal bags.
pale orange bags contain 2 plaid yellow bags, 1 posh indigo bag.
faded chartreuse bags contain 4 dull tomato bags, 3 mirrored salmon bags.
bright orange bags contain 4 vibrant yellow bags, 4 vibrant salmon bags, 3 faded white bags, 4 clear orange bags.
dark blue bags contain 3 vibrant indigo bags.
striped indigo bags contain 3 vibrant magenta bags.
mirrored blue bags contain 5 bright crimson bags, 5 light salmon bags, 5 dark olive bags.
plaid chartreuse bags contain 5 drab tomato bags, 1 dark tan bag, 4 dotted crimson bags, 5 dark bronze bags.
shiny cyan bags contain 1 shiny aqua bag, 5 clear plum bags, 1 posh gray bag, 5 shiny coral bags.
dim violet bags contain 3 drab chartreuse bags, 4 pale lavender bags, 5 shiny gold bags.
dotted orange bags contain 5 plaid chartreuse bags, 4 vibrant purple bags, 5 posh teal bags.
clear magenta bags contain 3 clear indigo bags.
vibrant chartreuse bags contain 4 faded violet bags.
dark cyan bags contain 2 dim plum bags, 5 light purple bags, 1 dark olive bag, 2 dim maroon bags.
light olive bags contain 5 pale lime bags, 2 mirrored lime bags.
vibrant lavender bags contain 2 pale black bags.
plaid maroon bags contain 4 clear white bags.
pale aqua bags contain 2 shiny tomato bags, 4 dim gold bags, 5 pale green bags.
posh blue bags contain 1 wavy fuchsia bag, 3 light cyan bags, 1 striped beige bag.
clear lime bags contain 4 mirrored gold bags, 2 wavy coral bags.
pale yellow bags contain 2 dull cyan bags, 1 dotted maroon bag, 3 light teal bags, 1 clear gray bag.
muted lavender bags contain 1 wavy cyan bag.
light magenta bags contain 5 shiny lime bags, 3 light indigo bags, 2 clear beige bags.
dotted maroon bags contain 4 wavy yellow bags, 5 bright fuchsia bags, 5 faded brown bags.
shiny red bags contain 2 faded tomato bags, 3 faded black bags, 2 pale teal bags, 5 muted bronze bags.
shiny lavender bags contain 1 bright yellow bag, 2 plaid purple bags, 2 light coral bags, 4 pale purple bags.
clear violet bags contain 1 plaid chartreuse bag.
muted white bags contain 1 striped turquoise bag.
plaid bronze bags contain no other bags.
faded fuchsia bags contain 5 clear red bags.
dull orange bags contain 5 drab gold bags, 2 dotted purple bags, 4 bright turquoise bags, 4 plaid bronze bags.
clear red bags contain 4 clear crimson bags, 3 bright turquoise bags, 3 clear green bags.
vibrant aqua bags contain 5 light gray bags, 3 light tomato bags, 5 vibrant white bags, 5 posh tomato bags.
drab bronze bags contain 3 striped fuchsia bags, 3 vibrant coral bags, 3 posh turquoise bags, 5 clear maroon bags.
dotted crimson bags contain 4 muted teal bags, 5 dull violet bags, 2 muted gold bags.
mirrored purple bags contain 5 drab black bags, 1 dotted teal bag.
dark aqua bags contain no other bags.
light tan bags contain 5 dotted tan bags.
wavy turquoise bags contain 2 mirrored cyan bags, 4 mirrored magenta bags, 5 dull salmon bags, 2 vibrant tomato bags.
light black bags contain 5 clear plum bags, 5 faded olive bags.
vibrant blue bags contain 4 dark crimson bags, 2 clear indigo bags, 2 pale lime bags.
clear silver bags contain 1 striped coral bag, 5 faded crimson bags, 5 mirrored chartreuse bags, 2 vibrant magenta bags.
shiny gold bags contain 5 plaid bronze bags, 4 bright fuchsia bags, 2 light violet bags, 1 clear plum bag.
bright red bags contain 2 pale coral bags.
dull tomato bags contain 3 mirrored salmon bags.
clear fuchsia bags contain 3 bright brown bags.
faded orange bags contain 4 clear plum bags, 5 faded maroon bags.
clear black bags contain 2 plaid aqua bags, 2 faded yellow bags, 2 bright magenta bags, 5 striped blue bags.
drab white bags contain 1 muted olive bag, 5 posh magenta bags, 3 plaid tan bags.
wavy salmon bags contain 1 clear maroon bag.
shiny yellow bags contain 2 bright magenta bags.
shiny lime bags contain 4 shiny turquoise bags, 2 mirrored white bags, 4 faded bronze bags, 1 vibrant white bag.
clear yellow bags contain 5 shiny violet bags, 4 light tomato bags, 3 clear plum bags, 1 wavy indigo bag.
wavy red bags contain 2 dim crimson bags, 5 plaid cyan bags.
dotted red bags contain 5 dim plum bags.
faded red bags contain 3 striped maroon bags.
muted gold bags contain 1 vibrant teal bag, 3 faded crimson bags.
dotted aqua bags contain 2 dotted coral bags, 4 faded maroon bags.
vibrant purple bags contain 3 posh aqua bags, 2 light gray bags.
faded salmon bags contain 5 plaid brown bags, 4 drab white bags, 5 wavy olive bags.
light chartreuse bags contain 4 shiny coral bags, 2 shiny purple bags.
dim brown bags contain 5 clear bronze bags, 2 striped orange bags, 5 dark olive bags.
striped black bags contain 1 dark orange bag, 4 faded red bags.
dark white bags contain 5 clear white bags, 2 dull bronze bags, 5 dull chartreuse bags, 3 dark crimson bags.
striped brown bags contain 1 shiny indigo bag, 1 vibrant black bag.
bright olive bags contain 4 striped black bags, 3 dull violet bags, 3 vibrant orange bags.
dull green bags contain 4 dotted orange bags, 5 dotted coral bags, 5 pale tan bags, 1 faded beige bag.
faded bronze bags contain 3 shiny blue bags.
faded tan bags contain 2 pale bronze bags.
plaid cyan bags contain 4 clear maroon bags, 5 dark aqua bags, 1 bright fuchsia bag, 2 plaid bronze bags.
striped bronze bags contain 1 vibrant silver bag, 1 dim red bag, 3 vibrant maroon bags.
dotted blue bags contain 2 vibrant tan bags.
drab gold bags contain 2 dim crimson bags, 3 faded tomato bags, 2 drab magenta bags.
faded cyan bags contain 3 dotted lavender bags, 4 mirrored plum bags, 2 plaid olive bags, 1 muted lime bag.
dark green bags contain 5 dim crimson bags, 4 vibrant aqua bags, 1 pale beige bag, 5 faded aqua bags.
posh green bags contain 4 dim maroon bags, 3 faded black bags, 5 wavy yellow bags.
pale brown bags contain 3 dull coral bags.
light yellow bags contain 5 vibrant black bags.
mirrored coral bags contain 1 wavy teal bag, 5 plaid gold bags, 4 muted crimson bags, 3 clear teal bags.
plaid blue bags contain 2 vibrant tomato bags, 3 light fuchsia bags, 1 shiny tomato bag, 1 faded red bag.
light gold bags contain 1 plaid chartreuse bag, 3 plaid tan bags.
light brown bags contain 4 light green bags, 1 shiny orange bag.
light gray bags contain 3 drab magenta bags.
wavy teal bags contain 2 drab tan bags.
drab tan bags contain 5 light tomato bags, 3 muted tan bags, 3 shiny blue bags, 1 dull white bag.
plaid beige bags contain 5 muted crimson bags, 5 faded white bags, 5 dull aqua bags.
striped fuchsia bags contain 5 dim plum bags, 1 faded gray bag, 2 pale turquoise bags, 3 dull teal bags.
vibrant red bags contain 3 dim aqua bags, 5 plaid green bags.
faded crimson bags contain 3 faded brown bags.
muted aqua bags contain 5 muted purple bags, 5 drab tan bags, 2 shiny magenta bags.
pale blue bags contain 4 pale lavender bags.
wavy tomato bags contain 2 striped plum bags, 4 dull aqua bags, 3 light tan bags, 4 pale black bags.
drab fuchsia bags contain 2 muted purple bags, 2 striped lime bags, 4 clear white bags, 1 bright turquoise bag.
dim crimson bags contain 3 light tomato bags, 5 muted crimson bags, 4 plaid bronze bags, 2 faded tomato bags.
faded turquoise bags contain 5 posh yellow bags, 3 plaid chartreuse bags.
vibrant indigo bags contain 5 bright turquoise bags.
mirrored turquoise bags contain 4 light lavender bags, 2 wavy turquoise bags, 2 wavy red bags.
posh turquoise bags contain 4 posh crimson bags.
vibrant white bags contain 2 dotted purple bags, 5 faded teal bags, 4 faded tomato bags, 5 dull aqua bags.
faded olive bags contain 4 bright bronze bags, 2 vibrant purple bags, 3 dotted violet bags.
posh orange bags contain 4 light green bags, 5 vibrant white bags, 1 shiny lime bag.
pale violet bags contain 3 drab indigo bags.
dotted indigo bags contain 5 bright coral bags, 3 plaid purple bags.
clear tan bags contain 4 dim plum bags, 5 vibrant purple bags.
vibrant orange bags contain 3 striped plum bags.
shiny violet bags contain 5 plaid cyan bags, 5 striped plum bags.
striped silver bags contain 1 clear yellow bag, 3 dotted green bags.
bright chartreuse bags contain 5 wavy tomato bags, 2 bright yellow bags.
vibrant plum bags contain 3 wavy yellow bags, 5 dim maroon bags, 5 plaid bronze bags.
clear maroon bags contain no other bags.
wavy orange bags contain 3 plaid aqua bags, 1 pale salmon bag.
wavy bronze bags contain 5 drab green bags, 3 dim plum bags, 4 mirrored lavender bags.
light indigo bags contain 5 dark aqua bags.
shiny bronze bags contain 4 vibrant magenta bags, 2 clear teal bags, 4 muted coral bags.
posh aqua bags contain 2 dotted green bags, 4 bright plum bags, 1 vibrant orange bag.
striped maroon bags contain 5 dotted beige bags, 5 light tomato bags.
bright crimson bags contain 5 vibrant beige bags, 3 faded teal bags, 5 mirrored white bags.
pale green bags contain 4 bright beige bags, 2 posh turquoise bags, 3 mirrored silver bags, 5 dim lime bags.
shiny black bags contain 1 faded yellow bag.
plaid brown bags contain 4 shiny salmon bags, 2 pale bronze bags, 3 dark orange bags.
dim lavender bags contain 5 dotted tan bags, 4 dull maroon bags, 4 striped plum bags, 5 light purple bags.
dim gray bags contain 2 faded tomato bags.
dotted plum bags contain 4 light gray bags, 1 bright turquoise bag, 2 drab maroon bags.
faded purple bags contain 3 vibrant cyan bags, 3 shiny aqua bags.
drab plum bags contain 5 pale chartreuse bags, 1 wavy crimson bag.
muted salmon bags contain 3 pale orange bags, 4 faded yellow bags, 3 dim tomato bags.
posh gold bags contain 2 drab chartreuse bags.
light teal bags contain 2 clear green bags, 2 light violet bags, 1 clear yellow bag, 3 bright turquoise bags.
clear tomato bags contain 1 posh aqua bag, 1 bright beige bag, 5 pale coral bags, 3 mirrored crimson bags.
dull turquoise bags contain 2 plaid coral bags.
striped red bags contain 1 dotted green bag, 2 plaid olive bags, 1 clear crimson bag.
shiny plum bags contain 4 light indigo bags, 4 muted plum bags.
dull indigo bags contain 3 posh white bags, 1 posh green bag, 1 dull plum bag, 5 shiny black bags.
dotted coral bags contain 1 mirrored magenta bag, 2 bright maroon bags, 1 drab tomato bag.
drab indigo bags contain 1 dotted turquoise bag.
posh red bags contain 4 faded blue bags, 2 mirrored green bags.
wavy tan bags contain 3 shiny cyan bags, 1 striped gold bag, 2 dim silver bags, 3 plaid magenta bags.
dim chartreuse bags contain 2 clear bronze bags.
vibrant crimson bags contain 3 faded brown bags, 2 pale chartreuse bags.
plaid yellow bags contain 3 striped brown bags, 1 plaid white bag, 4 vibrant indigo bags.
posh fuchsia bags contain 5 faded bronze bags, 3 drab gray bags.
mirrored red bags contain 3 wavy lime bags, 4 bright tan bags, 5 faded white bags.
shiny coral bags contain 4 wavy yellow bags, 2 bright turquoise bags.
dull beige bags contain 3 posh aqua bags.
posh beige bags contain 1 pale maroon bag, 4 shiny teal bags, 1 clear lime bag.
posh maroon bags contain 1 muted olive bag, 2 dim black bags, 1 plaid cyan bag, 3 dim olive bags.
faded gray bags contain 1 vibrant tomato bag, 4 posh teal bags, 5 striped maroon bags.
dotted cyan bags contain 4 dull orange bags, 2 clear bronze bags, 4 posh gray bags.
bright green bags contain 5 posh tomato bags, 2 wavy red bags.
clear lavender bags contain 3 dark plum bags, 5 dim salmon bags, 2 mirrored magenta bags, 3 plaid silver bags.
muted fuchsia bags contain 5 pale cyan bags.
dark yellow bags contain 3 plaid orange bags, 5 pale lime bags, 2 pale red bags.
bright turquoise bags contain 2 wavy yellow bags.
light bronze bags contain 4 light purple bags.
clear orange bags contain 3 dotted purple bags, 4 plaid fuchsia bags, 1 shiny lime bag.
striped orange bags contain 4 striped red bags, 1 dark bronze bag.
clear brown bags contain 3 light lavender bags, 1 dim plum bag, 5 shiny gray bags.
wavy lavender bags contain 1 pale gray bag, 2 wavy white bags, 3 bright white bags.
bright bronze bags contain 2 shiny turquoise bags, 1 vibrant indigo bag.
dull cyan bags contain 5 plaid orange bags, 4 muted coral bags, 2 bright coral bags, 2 dark olive bags.
faded lime bags contain 4 faded yellow bags, 1 dim lavender bag.
shiny olive bags contain 1 muted olive bag, 4 mirrored turquoise bags, 3 plaid magenta bags.
mirrored tomato bags contain 1 wavy green bag, 1 dotted brown bag, 5 posh magenta bags.
striped cyan bags contain 2 dim teal bags, 3 bright bronze bags, 3 drab chartreuse bags, 4 posh salmon bags.
striped magenta bags contain 2 dark orange bags.
pale white bags contain 1 pale indigo bag.
striped plum bags contain 3 dim plum bags, 4 faded black bags, 1 faded brown bag.
faded brown bags contain 4 clear maroon bags.
mirrored indigo bags contain 2 wavy indigo bags, 2 dull fuchsia bags, 5 bright coral bags.
dark coral bags contain 5 dotted fuchsia bags.
dull fuchsia bags contain 5 pale turquoise bags, 5 dark purple bags, 4 light red bags.
clear chartreuse bags contain 5 dotted turquoise bags.
vibrant gray bags contain 3 plaid orange bags, 2 dotted teal bags.
bright fuchsia bags contain no other bags.
clear salmon bags contain 4 light lime bags, 1 muted black bag, 4 vibrant magenta bags, 1 drab yellow bag.
muted bronze bags contain 3 dull aqua bags, 4 striped turquoise bags.
striped beige bags contain 3 vibrant beige bags.
dim white bags contain 1 mirrored blue bag, 1 vibrant cyan bag, 1 plaid coral bag, 5 light yellow bags.
clear olive bags contain 2 faded teal bags, 1 vibrant orange bag, 4 dim bronze bags.
light purple bags contain 4 dull aqua bags, 1 light gray bag, 2 clear green bags, 4 light fuchsia bags.
mirrored white bags contain 3 faded tomato bags, 5 plaid cyan bags, 2 drab magenta bags.
drab silver bags contain 2 dim plum bags, 5 wavy yellow bags, 2 dull teal bags, 3 bright crimson bags.
dark maroon bags contain 5 mirrored purple bags, 5 light tomato bags.
posh lime bags contain 2 light indigo bags, 3 muted tan bags, 3 shiny coral bags.
pale crimson bags contain 2 dotted tan bags.
plaid turquoise bags contain 4 clear teal bags, 1 light lavender bag, 1 posh salmon bag, 5 light teal bags.
plaid lime bags contain 5 wavy gray bags, 5 dull magenta bags, 3 wavy yellow bags, 1 dim aqua bag.
pale silver bags contain 4 mirrored turquoise bags.
dull gold bags contain 3 mirrored gold bags, 5 vibrant purple bags, 3 light beige bags.
dark purple bags contain 5 wavy yellow bags.
faded lavender bags contain 5 posh bronze bags, 2 vibrant violet bags, 5 drab maroon bags, 3 wavy bronze bags.
dull crimson bags contain 3 muted red bags, 3 muted brown bags.
bright cyan bags contain 3 mirrored chartreuse bags, 5 light fuchsia bags, 2 light tan bags.
drab chartreuse bags contain 5 muted green bags, 1 drab olive bag, 4 clear beige bags.
dull gray bags contain 5 posh fuchsia bags.
bright black bags contain 5 faded brown bags, 3 dim aqua bags, 4 bright violet bags.
faded beige bags contain 5 bright teal bags, 4 faded crimson bags, 3 plaid teal bags.
posh purple bags contain 3 shiny purple bags, 3 plaid turquoise bags.
plaid white bags contain 1 dotted cyan bag.
wavy magenta bags contain 3 vibrant tan bags, 4 posh brown bags, 4 bright tan bags.
dim tomato bags contain 3 drab lime bags, 4 vibrant tomato bags.
mirrored maroon bags contain 3 drab coral bags.`;


/***/ }),

/***/ "5Skx":
/*!****************************************!*\
  !*** ./src/app/solution-code/day16.ts ***!
  \****************************************/
/*! exports provided: daySixteenPartOne, daySixteenPartTwo, daySixteenInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySixteenPartOne", function() { return daySixteenPartOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySixteenPartTwo", function() { return daySixteenPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySixteenInput", function() { return daySixteenInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function daySixteenPartOne(input) {
    const ruleRegex = /([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/;
    class TicketRule {
        constructor(rule) {
            const match = ruleRegex.exec(rule);
            if (!match)
                throw new Error(`Unknown ticket rule: ${rule}`);
            const [, name, rangeOneStart, rangeOneEnd, rangeTwoStart, rangeTwoEnd] = match;
            this.name = name;
            this._rangeOne = [Number(rangeOneStart), Number(rangeOneEnd)];
            this._rangeTwo = [Number(rangeTwoStart), Number(rangeTwoEnd)];
        }
        isInRange(value) {
            return (this._rangeOne[0] <= value && this._rangeOne[1] >= value)
                || (this._rangeTwo[0] <= value && this._rangeTwo[1] >= value);
        }
    }
    function parseTicket(ticket) {
        const values = ticket.split(',').map(Number);
        if (values.some(Number.isNaN)) {
            throw new Error('Invalid ticket value found');
        }
        return values;
    }
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const [ticketRules, , [, ...nearbyTickets]] = fileReader.readEntriesSeperatedByWhiteline();
    const rules = ticketRules.map(rule => new TicketRule(rule));
    const invalidTicketValues = nearbyTickets.map(parseTicket)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter(value => rules.every(rule => !rule.isInRange(value)));
    return invalidTicketValues.reduce((prev, curr) => prev + curr, 0);
}
function daySixteenPartTwo(input) {
    const ruleRegex = /([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/;
    class TicketRule {
        constructor(rule) {
            const match = ruleRegex.exec(rule);
            if (!match)
                throw new Error(`Unknown ticket rule: ${rule}`);
            const [, name, rangeOneStart, rangeOneEnd, rangeTwoStart, rangeTwoEnd] = match;
            this.name = name;
            this._validNumbers = new Set([
                ...this.validNumbersForRange([Number(rangeOneStart), Number(rangeOneEnd)]),
                ...this.validNumbersForRange([Number(rangeTwoStart), Number(rangeTwoEnd)])
            ]);
        }
        validNumbers() {
            return Array.from(this._validNumbers.values());
        }
        isInRange(value) {
            return this._validNumbers.has(value);
        }
        validNumbersForRange([start, end]) {
            return Array.from({ length: end - start + 1 }).map((_, i) => i + start);
        }
    }
    function parseTicket(ticket) {
        const values = ticket.split(',').map(Number);
        if (values.some(Number.isNaN)) {
            throw new Error('Invalid ticket value found');
        }
        return values;
    }
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const [ticketRules, [, myTicketUnparsed], [, ...nearbyTickets]] = fileReader.readEntriesSeperatedByWhiteline();
    const myTicket = parseTicket(myTicketUnparsed);
    const rules = ticketRules.map(rule => new TicketRule(rule));
    // all numbers that are possibly valid
    const allValidNumbers = rules.reduce((prev, curr) => {
        curr.validNumbers().forEach(num => prev.add(num));
        return prev;
    }, new Set());
    const validTickets = [myTicketUnparsed, ...nearbyTickets]
        .map(parseTicket)
        .filter(values => values.every(value => allValidNumbers.has(value)));
    const columnMappingPossibilities = new Map();
    for (const rule of rules) {
        for (let i = 0; i < rules.length; i++) {
            if (validTickets.every(ticket => rule.isInRange(ticket[i]))) {
                let existingMapping = columnMappingPossibilities.get(rule);
                if (!existingMapping)
                    columnMappingPossibilities.set(rule, existingMapping = []);
                existingMapping.push(i);
            }
        }
    }
    const columnMapping = new Map();
    if (columnMappingPossibilities.size !== rules.length)
        throw new Error('Failed to map all column possibilities');
    let tryAgain = true;
    while (tryAgain) {
        tryAgain = false;
        for (const [key, value] of Array.from(columnMappingPossibilities.entries())) {
            if (value.length === 1) {
                const column = value[0];
                columnMapping.set(key, column);
                Array.from(columnMappingPossibilities.values())
                    .forEach(options => {
                    const index = options.indexOf(column);
                    if (index === -1)
                        return;
                    options.splice(index, 1);
                });
                tryAgain = true;
            }
        }
    }
    if (columnMapping.size !== rules.length)
        throw new Error('Failed to map all columns');
    for (const rule of Array.from(columnMapping.keys())) {
        if (rule.name.startsWith('departure'))
            continue;
        columnMapping.delete(rule);
    }
    return Array.from(columnMapping.values())
        .reduce((prev, column) => {
        return prev * myTicket[column];
    }, 1);
}
const daySixteenInput = `departure location: 50-688 or 707-966
departure station: 33-340 or 351-960
departure platform: 42-79 or 105-954
departure track: 46-928 or 943-959
departure date: 42-464 or 482-974
departure time: 25-595 or 614-972
arrival location: 26-483 or 494-962
arrival station: 31-901 or 913-957
arrival platform: 35-721 or 736-958
arrival track: 44-639 or 661-960
class: 45-391 or 416-969
duration: 46-167 or 186-962
price: 42-312 or 335-969
route: 36-369 or 375-971
row: 46-870 or 877-972
seat: 49-836 or 846-961
train: 50-442 or 450-970
type: 37-706 or 715-952
wagon: 45-674 or 687-962
zone: 40-198 or 219-963

your ticket:
151,139,53,71,191,107,61,109,157,131,67,73,59,79,113,167,137,163,149,127

nearby tickets:
311,898,109,901,67,634,127,949,166,106,614,752,899,833,294,505,738,559,909,366
464,616,619,439,796,589,423,62,853,785,772,110,294,63,266,193,418,327,145,881
787,591,543,805,823,129,571,194,862,794,432,108,224,150,368,365,304,307,885,93
506,831,989,379,551,767,111,58,508,77,551,633,110,581,819,220,901,913,850,672
126,192,454,456,167,592,623,900,144,785,948,615,755,527,157,258,160,442,232,995
882,458,247,246,159,66,924,76,553,320,122,227,148,505,785,292,716,621,120,74
291,771,494,307,324,269,262,884,520,250,773,814,741,224,892,389,146,420,426,105
758,306,271,769,379,266,427,231,378,600,506,914,616,572,220,220,853,541,878,305
385,884,583,687,803,440,143,518,282,886,588,626,492,246,152,813,626,290,148,299
495,594,781,671,224,570,362,220,419,777,835,296,774,455,249,407,310,895,586,460
358,454,892,774,531,390,230,276,112,273,56,911,574,737,514,753,73,741,894,416
868,533,763,555,423,482,790,188,854,855,849,686,794,782,847,717,142,274,381,551
251,662,133,877,895,225,915,848,159,781,496,889,907,265,127,135,156,504,669,779
155,780,126,134,799,138,298,363,916,339,389,156,768,451,613,853,73,586,419,355
855,425,305,118,574,881,909,359,144,574,575,715,266,924,745,748,868,72,120,360
819,155,629,536,902,498,623,560,164,949,71,153,311,614,336,830,455,280,542,584
744,136,855,989,166,545,421,618,896,921,224,870,574,668,450,131,133,862,234,513
583,627,889,136,253,773,233,76,425,946,324,285,688,69,237,861,152,585,243,337
69,547,531,517,719,430,556,241,369,515,586,423,299,822,294,764,380,867,90,495
825,244,715,769,133,801,292,252,626,691,541,281,687,439,618,108,435,553,820,832
566,309,190,99,195,380,434,920,294,523,360,789,788,306,238,110,286,792,778,252
880,899,24,257,442,811,758,250,820,666,821,312,76,883,113,833,575,758,893,434
220,677,537,78,384,822,747,146,265,339,589,521,741,292,917,338,554,544,542,270
636,554,920,770,556,813,533,832,587,277,460,225,232,261,743,674,669,629,217,632
500,404,236,631,862,886,274,358,783,764,687,889,895,802,442,220,625,442,458,585
589,747,879,877,417,543,166,926,870,195,362,413,116,794,337,119,788,926,590,574
483,783,866,56,250,570,976,421,452,665,106,435,545,945,809,620,58,511,268,288
870,498,112,280,489,620,141,257,820,417,150,142,663,760,671,111,255,358,147,498
814,337,544,686,592,509,110,626,78,63,248,881,863,552,385,150,457,186,117,663
226,827,379,825,747,260,416,833,563,495,685,237,197,149,674,541,559,266,378,715
505,883,190,516,582,813,463,850,53,877,716,351,687,787,439,886,993,115,638,544
125,585,430,806,416,756,800,627,755,917,259,78,688,802,922,238,235,815,502,708
852,584,368,237,69,336,268,786,429,877,15,451,593,248,913,878,590,687,623,361
616,65,672,373,428,889,243,287,890,761,292,108,436,291,71,262,515,853,273,367
789,770,877,482,545,362,614,107,772,752,532,756,829,789,814,557,2,236,441,632
557,382,810,928,865,408,268,914,269,620,165,440,368,848,136,251,232,51,123,293
626,307,862,788,132,781,466,442,921,441,802,228,816,849,740,389,622,546,637,265
51,463,547,440,740,775,140,790,258,436,455,193,50,926,250,579,707,531,511,121
54,770,821,363,508,355,284,51,748,798,292,564,883,239,277,458,867,270,114,18
584,558,888,566,141,527,161,561,224,906,61,364,235,759,614,637,381,547,584,302
879,139,370,784,877,623,619,637,312,621,898,614,53,277,661,794,788,515,284,308
634,569,483,777,824,109,786,427,721,562,868,536,297,259,422,254,671,109,6,572
115,194,524,462,423,989,278,638,269,543,760,384,265,234,796,672,721,877,748,375
335,489,387,552,300,816,925,310,797,266,79,237,559,146,819,768,264,304,186,287
760,224,128,296,756,72,885,517,787,456,572,131,74,460,831,283,923,634,634,448
880,920,847,75,812,816,455,579,308,549,263,802,389,152,227,761,528,257,874,804
154,232,540,358,252,857,825,552,740,751,762,833,166,584,120,430,109,557,313,422
562,771,756,757,421,740,559,589,634,421,69,807,282,756,290,161,508,848,184,743
882,622,906,459,273,229,808,219,435,761,743,919,435,531,222,364,592,881,544,304
633,163,75,231,340,537,772,521,755,857,542,741,821,305,504,719,455,186,445,883
438,271,812,391,526,774,63,948,806,485,377,295,769,565,267,336,135,948,847,577
589,276,339,850,546,834,423,56,167,757,555,307,387,65,387,883,483,707,251,618
116,116,464,715,75,533,802,360,125,624,159,107,539,389,617,975,541,64,483,296
440,142,573,283,806,62,373,195,105,831,241,793,503,535,948,949,435,419,798,893
901,462,285,422,110,636,425,108,549,874,152,790,625,339,546,230,442,579,73,518
813,355,636,915,632,506,421,234,867,582,452,523,854,574,485,794,188,506,130,879
387,508,849,167,518,509,500,450,361,532,663,713,715,916,128,134,189,809,855,797
854,549,479,219,566,855,588,789,367,189,560,518,553,738,718,518,879,551,635,494
774,945,525,452,191,756,378,381,755,588,917,303,850,263,195,582,261,571,456,935
525,552,878,821,666,137,549,788,114,301,421,75,253,637,924,500,824,996,866,462
835,505,665,765,831,889,383,578,513,232,340,372,835,464,751,820,306,255,381,898
571,312,770,259,775,881,312,790,143,266,752,235,264,761,884,65,62,465,519,629
418,145,464,368,79,301,577,617,59,504,110,945,455,222,392,528,854,506,337,537
369,437,553,627,527,864,762,60,250,173,416,769,526,275,251,282,798,160,120,307
661,848,126,578,821,531,109,267,588,482,928,504,301,567,521,426,523,287,631,874
365,425,303,258,515,115,324,164,878,193,517,437,943,779,243,388,423,917,814,860
751,534,519,186,918,890,297,339,639,524,886,140,187,688,715,279,161,686,810,219
764,551,518,495,118,66,824,778,801,790,883,198,164,899,79,462,430,259,830,343
926,758,618,58,121,922,124,538,869,135,149,361,899,119,567,777,78,792,407,827
340,502,282,439,304,836,802,127,285,637,528,165,61,292,70,720,894,383,675,129
503,856,375,500,362,884,590,335,435,476,790,866,279,526,107,825,305,880,55,232
156,63,503,530,575,831,666,636,161,738,549,135,824,823,110,819,684,69,118,265
774,786,639,876,557,947,133,78,158,256,357,858,130,554,550,360,504,297,219,747
510,744,582,123,74,584,63,515,577,777,337,850,197,50,294,912,434,72,792,534
586,708,751,273,513,570,664,337,464,224,631,546,866,516,562,266,452,303,585,391
575,301,747,743,510,150,584,869,135,348,432,369,383,667,54,665,377,791,272,808
571,232,427,628,621,68,847,948,384,192,114,426,573,813,447,160,751,867,50,901
247,796,994,106,626,232,136,123,254,639,816,144,462,122,505,915,536,221,419,812
418,887,854,779,718,554,667,924,529,74,365,301,775,497,441,198,50,370,455,898
567,516,898,860,228,464,265,750,415,829,747,536,562,812,623,105,882,353,55,846
636,275,524,513,688,188,139,546,780,782,663,74,263,924,831,541,981,626,499,848
125,137,620,268,883,252,359,877,533,587,782,148,617,496,916,62,818,913,708,561
389,510,357,539,143,78,106,766,638,921,901,502,595,239,681,220,589,922,528,767
198,522,139,111,260,378,149,749,810,569,502,627,857,388,810,662,812,835,382,976
358,738,779,140,538,900,945,326,500,848,797,496,220,455,428,110,823,944,623,252
866,528,567,614,340,743,308,124,147,164,67,592,924,557,301,134,427,846,346,227
900,916,308,246,530,243,638,595,922,427,353,493,883,245,271,223,738,762,860,375
115,197,557,459,568,880,628,779,913,860,793,305,542,616,251,565,3,108,383,137
832,880,752,66,296,620,269,196,824,744,69,637,885,555,614,429,162,814,284,403
793,51,792,69,147,452,831,552,517,807,280,287,535,60,294,556,550,189,736,698
889,831,439,779,773,630,263,105,280,737,743,1,133,736,559,186,770,420,798,526
511,537,594,165,384,638,765,884,421,457,378,376,457,419,241,916,370,614,285,619
67,364,808,866,13,114,230,50,296,821,899,263,136,630,572,828,238,126,312,787
143,327,300,239,561,459,949,538,673,147,186,54,589,504,914,119,796,881,921,497
421,580,568,543,853,573,422,746,772,766,747,949,227,244,719,417,422,401,163,260
914,360,571,808,74,193,544,863,551,852,949,134,630,456,63,72,792,930,249,782
534,990,895,459,338,65,232,626,252,617,433,720,238,248,869,621,800,626,50,804
380,865,108,307,69,290,53,622,21,744,798,573,155,866,551,366,437,781,758,268
518,521,634,360,575,285,258,848,149,339,589,306,138,822,502,77,761,85,913,547
463,738,668,302,234,812,444,294,431,308,386,441,263,424,671,376,50,536,58,661
835,791,260,798,533,108,19,228,615,924,559,160,337,591,539,388,584,365,575,535
764,272,551,384,633,542,623,803,908,512,381,520,854,497,451,836,64,365,556,302
661,458,196,268,464,50,802,358,359,136,917,663,587,198,122,884,433,689,579,661
340,155,53,590,759,252,526,114,545,482,815,521,827,665,472,504,770,380,552,817
241,464,198,257,426,22,917,390,521,742,302,387,452,120,578,717,386,75,554,619
153,585,785,361,561,746,834,186,511,733,132,295,771,504,259,382,154,50,528,669
275,289,591,5,242,198,721,300,921,505,688,339,668,66,452,453,148,197,740,919
574,768,308,529,429,549,532,351,716,495,124,482,351,435,862,459,57,987,584,662
573,765,829,232,569,76,720,51,850,451,582,583,446,913,70,133,856,391,380,542
4,849,525,247,593,384,881,122,383,949,794,61,802,455,786,289,796,921,737,665
501,765,251,441,186,292,231,563,791,886,442,470,856,150,135,482,462,671,788,451
460,745,379,186,919,73,423,771,863,0,64,73,463,387,816,914,312,834,261,164
852,310,267,877,626,949,578,590,248,514,292,865,577,561,823,129,243,600,630,504
587,667,522,834,887,55,711,244,309,438,815,437,526,562,945,526,858,549,528,307
252,880,784,534,975,520,299,79,635,451,421,437,921,798,283,913,52,145,750,849
775,756,131,453,351,188,364,548,637,593,196,386,898,924,252,752,814,629,666,320
568,59,228,673,152,627,913,513,75,450,497,779,116,122,628,259,257,863,732,64
428,378,193,806,823,551,452,620,791,812,711,503,573,512,384,116,229,846,379,883
720,589,514,105,617,455,152,856,543,379,832,499,232,271,542,258,578,619,233,684
794,766,137,925,537,464,739,819,556,822,614,291,756,771,256,66,901,905,739,167
436,437,671,774,667,436,520,800,50,444,162,635,576,196,160,758,302,914,786,627
375,753,719,497,786,853,377,263,619,740,815,166,141,533,51,664,824,20,68,50
789,353,275,885,135,264,243,277,309,688,122,62,252,307,543,231,612,566,666,869
749,56,284,239,743,851,767,556,417,525,285,282,272,619,252,135,114,629,555,997
273,234,421,69,157,808,552,282,759,806,877,238,744,270,928,510,941,287,788,248
881,380,423,808,431,256,108,299,306,57,880,595,416,225,627,766,137,874,825,250
889,751,593,568,548,500,281,54,548,664,575,897,130,539,504,145,782,52,541,371
618,134,62,526,743,638,281,76,834,766,241,349,338,507,142,856,538,525,435,739
529,771,635,123,224,323,716,753,824,436,220,573,285,812,631,165,569,61,510,826
312,273,763,259,555,254,883,639,443,920,222,266,533,511,129,944,286,288,155,132
278,447,383,526,114,233,715,947,626,763,307,114,155,523,198,550,263,156,802,856
106,889,857,767,297,793,917,687,753,57,150,99,109,514,545,424,383,463,428,746
892,674,198,789,459,926,593,375,561,426,912,304,621,795,636,276,614,113,359,811
855,815,865,190,763,273,361,522,786,409,386,541,267,531,197,257,65,455,513,795
437,224,56,583,233,140,404,430,921,288,517,525,914,861,423,880,156,916,617,129
416,521,255,468,368,688,56,638,738,385,417,50,749,451,625,454,866,880,523,805
336,919,861,71,506,567,18,243,243,804,507,382,453,270,258,631,424,822,359,520
557,352,228,830,784,853,231,778,629,769,794,554,716,497,128,225,767,59,600,573
437,896,79,907,572,760,65,122,368,75,133,50,532,850,268,810,461,535,740,378
571,503,358,122,441,419,419,765,592,51,565,452,887,455,372,369,768,246,536,632
622,425,629,939,255,263,295,549,541,669,256,106,855,189,249,923,375,238,309,270
810,366,562,591,780,736,11,767,819,515,590,620,577,925,511,550,887,857,819,148
885,248,533,360,495,236,138,251,160,190,553,798,678,196,864,578,59,772,783,296
634,156,264,711,581,59,146,72,463,434,483,893,386,228,571,307,926,357,897,339
891,281,717,662,635,676,506,269,359,78,195,862,784,750,552,525,233,127,438,281
162,425,237,76,111,364,60,639,826,263,128,247,877,546,585,849,393,456,687,111
285,593,282,293,806,290,441,857,508,419,118,592,275,545,187,826,466,450,385,430
109,791,431,767,993,663,662,826,416,784,816,557,527,721,546,251,806,308,761,452
294,254,112,156,772,495,922,123,862,358,495,665,408,585,565,242,302,882,880,73
166,230,75,797,116,750,781,504,786,802,532,128,257,776,712,546,813,852,297,133
340,776,413,539,567,109,614,135,797,53,428,73,440,893,197,420,231,266,897,52
353,540,160,159,152,639,518,774,223,945,595,131,256,167,593,666,521,166,383,731
430,718,111,632,771,851,900,395,557,454,430,924,337,588,546,755,777,356,381,784
340,754,857,428,785,753,781,588,526,592,275,638,67,530,766,126,551,8,265,114
456,433,591,319,595,106,914,621,368,149,74,361,60,756,145,864,298,455,746,237
439,117,198,432,340,595,740,890,8,854,279,820,124,496,293,741,221,887,879,564
568,499,360,663,442,900,191,235,566,358,426,572,291,451,499,668,718,284,766,987
616,592,265,139,165,514,153,239,368,848,304,520,269,582,533,823,105,878,431,603
520,557,247,760,826,823,369,11,547,617,744,890,186,520,162,760,586,141,454,422
146,814,295,534,824,294,795,880,500,679,562,451,914,461,628,858,738,776,849,282
297,544,196,386,239,463,152,542,672,634,768,333,245,774,456,895,69,835,441,515
456,786,793,889,287,484,513,818,494,573,256,376,108,564,865,383,627,385,291,510
236,70,743,460,802,893,120,715,900,163,535,425,226,513,822,583,699,525,635,877
671,534,892,769,422,756,304,802,620,386,535,495,851,14,889,806,571,298,853,390
914,279,576,262,421,880,521,112,338,632,563,922,242,355,743,332,236,240,634,508
483,673,916,890,157,912,139,859,571,798,520,895,242,546,269,819,864,378,792,137
244,306,273,299,821,187,538,775,766,890,277,799,712,77,870,541,573,813,820,231
755,277,304,277,452,242,744,247,264,593,292,279,429,559,334,271,269,135,288,240
914,189,270,64,3,562,866,533,867,559,868,548,736,241,388,242,261,246,832,546
776,848,272,629,793,272,158,720,277,498,433,923,826,273,582,54,902,53,132,860
815,578,438,378,797,818,562,615,219,526,773,864,520,794,718,106,795,160,292,6
885,338,770,752,433,155,264,245,257,811,442,945,633,530,497,666,576,866,489,454
523,367,353,634,661,268,829,577,738,787,762,705,537,421,265,944,153,258,137,518
615,811,377,815,68,532,760,580,494,273,108,186,850,568,362,254,367,343,663,833
805,769,924,335,193,385,775,528,113,224,434,502,794,418,756,628,764,991,879,749
914,166,799,408,836,617,833,626,783,737,752,521,671,772,420,53,632,463,255,578
522,927,328,914,376,246,626,742,138,628,923,589,893,774,869,359,924,138,633,351
220,617,62,223,813,146,618,310,58,825,155,827,334,674,568,824,298,849,504,223
281,629,828,61,921,276,635,625,771,671,494,923,508,160,500,747,667,989,461,835
67,132,431,132,823,946,257,361,848,867,156,553,634,615,228,889,887,536,845,74
291,59,666,488,771,636,263,821,300,736,562,775,750,854,568,108,638,892,291,353
194,718,561,501,857,434,233,535,529,586,629,546,900,251,749,114,337,132,626,489
779,503,708,755,258,357,439,239,363,227,360,631,234,622,513,889,336,833,64,244
626,258,635,365,918,420,135,310,505,373,71,867,75,55,517,156,310,152,897,578
433,454,916,898,285,160,862,893,802,437,113,536,426,557,160,130,243,731,817,258
79,593,534,802,669,895,360,306,987,522,508,560,116,867,777,139,811,864,664,54
756,780,489,281,783,856,142,159,263,50,338,227,621,821,591,591,773,781,746,553
533,162,269,270,979,153,633,124,157,855,351,500,141,416,637,817,105,165,251,108
752,129,443,219,748,809,797,817,133,524,429,340,120,637,813,780,483,524,534,770
221,945,219,526,834,66,685,836,301,226,107,623,894,290,521,482,890,451,590,805
108,390,113,186,130,442,886,151,384,547,402,738,79,719,509,825,882,462,775,846
302,590,799,294,881,266,718,8,382,431,564,582,762,220,795,546,388,366,453,499
65,715,456,790,301,51,776,719,543,782,58,563,372,116,758,529,673,482,806,547
832,386,460,692,71,574,823,625,338,291,66,109,384,745,847,747,383,589,386,592
527,583,763,916,375,54,460,755,784,58,786,423,309,852,245,153,489,462,807,851
571,663,715,462,795,266,463,299,531,930,755,291,112,749,924,895,518,914,767,483
891,265,879,226,291,517,252,272,711,270,857,524,797,365,292,256,451,383,118,494
928,635,196,112,292,519,820,425,541,924,130,797,462,857,122,878,62,617,338,475
562,78,821,105,518,749,886,358,680,868,195,438,222,802,247,830,828,920,54,424
381,482,556,767,624,229,106,673,849,822,379,813,818,264,345,813,749,120,922,153
290,458,160,356,302,877,452,57,631,761,661,670,134,859,936,750,359,671,661,891
739,61,51,119,590,521,736,163,364,737,769,282,439,252,703,621,256,438,790,529
618,234,737,603,582,814,277,186,231,507,112,482,68,787,161,138,196,115,531,562
618,364,134,836,664,114,69,758,362,80,753,594,561,458,514,293,925,59,791,137
247,922,763,662,744,494,53,861,331,799,573,721,336,901,848,721,108,523,881,283
665,792,338,122,587,376,377,232,521,199,434,388,164,437,113,79,748,79,622,869
289,246,275,662,627,433,941,890,666,759,230,77,228,514,785,456,279,433,746,137
747,799,661,793,736,863,756,385,380,77,186,191,50,918,623,139,298,486,377,895
572,272,361,132,846,548,189,196,807,132,747,197,366,565,878,748,148,271,666,199
319,274,754,575,293,337,580,51,923,864,816,387,832,196,340,567,246,852,535,830
618,273,147,529,760,739,757,418,265,304,798,417,497,496,916,617,448,142,819,309
920,373,814,775,793,629,233,900,575,131,810,312,161,778,482,186,163,560,893,110
188,129,546,738,261,70,270,249,592,134,565,768,160,378,293,792,532,627,942,615
460,812,50,158,509,108,149,849,792,711,824,79,270,504,823,305,900,108,381,584
260,768,64,746,896,550,529,148,62,506,510,800,606,778,159,141,944,50,810,787
505,762,883,252,795,436,141,913,64,113,285,120,633,561,903,666,261,766,389,516
442,807,388,923,284,671,926,285,615,897,664,132,471,508,538,761,423,454,582,55
816,281,846,386,415,152,228,879,514,814,161,311,744,356,64,131,802,119,789,751
424,450,675,159,896,230,560,124,749,352,167,419,251,133,550,546,633,517,234,428
561,431,667,525,553,536,366,892,529,271,535,616,130,748,458,846,807,590,467,667
892,164,310,355,719,17,718,636,502,76,921,284,166,496,639,292,67,915,761,124
897,127,261,360,134,831,220,559,427,494,806,365,255,629,546,762,812,446,526,531
821,538,434,901,787,459,433,615,737,853,539,533,271,520,539,561,317,778,835,900
190,846,772,280,452,167,870,736,637,425,716,507,758,550,899,928,565,307,756,909
808,63,798,295,110,867,754,496,224,743,557,521,893,740,230,255,584,853,702,312
887,70,336,851,523,457,611,514,256,307,360,451,825,813,191,542,544,277,432,916
924,990,575,791,162,228,57,286,517,525,455,110,928,511,834,61,296,108,72,510
591,631,813,536,773,794,797,138,738,302,243,886,527,5,270,225,361,531,362,510
268,747,384,503,665,223,485,762,132,223,858,539,434,355,817,532,949,284,106,619
775,574,924,67,819,255,335,801,492,771,352,524,513,141,60,223,531,754,189,923
621,717,780,821,747,307,627,288,544,790,360,604,459,418,309,818,60,887,630,854
436,812,740,449,378,560,802,235,391,276,194,310,627,265,821,516,867,818,426,889
673,907,535,672,77,243,265,277,121,137,221,137,925,791,105,736,496,525,505,166
668,153,782,889,281,460,945,520,524,107,493,812,247,265,854,870,514,417,292,809
273,540,946,58,776,564,219,228,546,546,429,449,594,147,502,383,55,262,284,503
891,360,870,144,534,759,751,821,536,390,435,935,286,543,252,663,268,920,235,614
546,111,555,350,752,236,153,595,811,437,886,122,914,265,664,377,850,745,746,948
787,548,337,886,625,163,869,721,273,440,788,662,555,834,527,434,853,854,374,555`;


/***/ }),

/***/ "5fZc":
/*!****************************************!*\
  !*** ./src/app/solution-code/day15.ts ***!
  \****************************************/
/*! exports provided: dayFifteenPartOne, dayFifteenPartTwo, dayFifteenInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFifteenPartOne", function() { return dayFifteenPartOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFifteenPartTwo", function() { return dayFifteenPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFifteenInput", function() { return dayFifteenInput; });
function dayFifteenPartOne(input) {
    var _a, _b;
    const numbers = input.split(',').map(Number);
    const numbersSpoken = {}; // record for last spoken indices
    let previous = -1;
    for (let i = 0; i < 2020; i++) {
        if (i < numbers.length) {
            // start number
            previous = numbers[i];
            numbersSpoken[previous] = [i];
        }
        else {
            const previousValue = numbersSpoken[previous];
            if (previousValue.length === 1) {
                previous = 0;
                numbersSpoken[0] = [...((_a = numbersSpoken[0]) !== null && _a !== void 0 ? _a : []), i];
            }
            else {
                const [secondLast, last] = previousValue.slice(previousValue.length - 2);
                const numberSpoken = last - secondLast;
                numbersSpoken[numberSpoken] = [...((_b = numbersSpoken[numberSpoken]) !== null && _b !== void 0 ? _b : []), i];
                previous = numberSpoken;
            }
        }
    }
    return previous;
}
function dayFifteenPartTwo(input) {
    const numbers = input.split(',').map(Number);
    const numbersSpoken = new Map();
    function getOrAdd(numberSpoken, newIndex) {
        const existing = numbersSpoken.get(numberSpoken);
        if (!existing)
            numbersSpoken.set(numberSpoken, [newIndex]);
        else
            existing.push(newIndex);
    }
    let previous = -1;
    for (let i = 0; i < 30000000; i++) {
        if (i < numbers.length) {
            // start number
            previous = numbers[i];
            getOrAdd(previous, i);
        }
        else {
            const previousValue = numbersSpoken.get(previous);
            if (previousValue.length === 1) {
                previous = 0;
                getOrAdd(0, i);
            }
            else {
                const [secondLast, last] = previousValue.slice(previousValue.length - 2);
                const numberSpoken = last - secondLast;
                getOrAdd(numberSpoken, i);
                previous = numberSpoken;
            }
        }
    }
    return previous;
}
const dayFifteenInput = `8,0,17,4,1,12`;


/***/ }),

/***/ "83wl":
/*!****************************************!*\
  !*** ./src/app/solution-code/day05.ts ***!
  \****************************************/
/*! exports provided: dayFivePartTwo, dayFiveInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFivePartTwo", function() { return dayFivePartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFiveInput", function() { return dayFiveInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayFivePartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const parsed = fileReader.readLineByLine((line) => {
        const ftb = line.substr(0, 7);
        const ltr = line.substr(7);
        return {
            ftb: ftb.split(''),
            ltr: ltr.split(''),
        };
    });
    function reduce(value, upper, lower, range) {
        if (range[0] === range[1])
            return range[0];
        if (value.length === 0)
            throw new Error('Whoopsie, coding error');
        const currentVal = value.pop();
        const diff = range[1] - range[0];
        const middle = Math.floor(diff / 2);
        if (currentVal === upper) {
            return reduce(value, upper, lower, [range[0], range[1] - middle - 1]);
        }
        else {
            return reduce(value, upper, lower, [range[0] + middle + 1, range[1]]);
        }
    }
    const asRowAndColumn = parsed.map(({ ftb, ltr }) => {
        const row = reduce([...ftb.reverse()], 'F', 'B', [0, 127]);
        const column = reduce([...ltr.reverse()], 'L', 'R', [0, 7]);
        return { row, column };
    });
    const heighestId = asRowAndColumn.reduce((prev, { row, column }) => {
        const id = row * 8 + column;
        prev.ids.push(id);
        return {
            max: Math.max(prev.max, id),
            min: Math.min(prev.min, id),
            ids: prev.ids,
        };
    }, {
        max: Number.MIN_VALUE,
        min: Number.MAX_VALUE,
        ids: [],
    });
    for (let i = heighestId.min; i <= heighestId.max; i++) {
        if (heighestId.ids.includes(i))
            continue;
        return i;
    }
    throw new Error('Match not found');
}
const dayFiveInput = `BBFBBBBRRL
FBFFFFBLRL
FBFBBFFRLR
FBFFFBFRLR
FFBBFFFLRR
FFBBBFFRRR
BFBBFBFLRL
BFFFBFFLRR
FBBBFFBLLR
BBFFBBFRRL
BFBBBBBRLR
FBBBBFFLLR
FFBFFFBLLR
FFBBFBFRRR
BBFBFFFRRR
FFBFFBBLLR
FBBFFBBLRL
FFBBBFBLLL
FFBFFBBLRR
FBFFBFBLLR
FFFBBBFLLL
BFBBFBFRLR
BBFBBBFLLL
FBBBFBBRLL
FFBBBBFRRL
BFBBBBFLRR
BBFBBFBLRL
FFBFFFBLRL
BFBBBBBRRR
FFFBFBFLLR
BFBFBBBLLR
FFBFBBBLRL
FFFBFBBLRR
BFFBFFFLLL
BFFFBFBLRL
BFBFFFBRLL
BBFFFFBRLR
FBBFFFBLRR
BFFFFBFLLL
BBBFFFFLLL
BFBFFBBRLL
BBFBFFFRRL
BFBBFFFRLR
BBFBFBFRRL
FBBFFBFRRL
BFBFBFFRRL
FFBFFFFLLR
FBBBFBBLLR
BBFFBFBRLL
BFFBFBBRLL
FBBFFFFRRR
BFFFBBBLRL
FFBBFFBLLL
FFFBBFFRRL
FBFBBBBLRR
FFBBBFFLLL
FBFBFFBRRR
FBBFFBBLLR
FBFFBFFRLL
BFBBBFFRLR
FBFFBBBLRR
FBFFFFBRLR
BBFFBBFLRL
FBFFBBFLRL
FBFBBFFRRR
BFBBBFBLRL
FBFBFFFLLR
FFFFBBBLLR
BFBFFBBLLR
BFFBBBFRLR
BFBBBFFLRR
BBFFFBBLLR
BFFFBBFLRL
FBFFBFBLRL
FBBBFFFRRL
FBFFFFBLLL
BFBFFBBRLR
BFBFBBBLRL
BFFBFBBRLR
FBBFBBBLLR
FFBFBFFRLL
FFFBBBBLRR
BFBFFFFLLL
BBFBFBBLLR
BFFFBBBRLR
FFBFFBFRLR
FBBFBBBLRL
BBFFFBBLLL
FFBFFBBRRR
FBBBBFBLLR
BBFBBFFRLL
BFBBBBFRLR
BBFBFFBRLR
FFBFFFFLLL
BBFBFBFRLL
FFBFFBBRLL
FBBFFFFRLR
FFBBBBBRRR
BBFFBBBLRL
BFFBBFBRLL
BFFFBBFRLL
BFFBFBFLRL
FBFFFFFRRR
BFFBFBBRRL
FBFBBBFLLR
FBFBFBBRLL
BBBFFFFRRR
BFBFBFFLRL
FFFFBFBRLL
FFBBFFBLRL
BBFFBFBLLL
BFFBBBBRLL
BFFBBBBRRR
BFBBBBFRRL
BBBFFFBLRL
FFBBFFFRRR
BFFFFFBRLR
FFFBBFBLLL
BFBFBBFRLR
FBBBFBFLRL
BFBFBFFRLR
BBFBBFFLRL
BFFFBFBLLL
BFFFFBBRLL
FFBFFFFRRL
BFFBFBBLLR
FFFFBBBLLL
FBBFFBBRRL
BFBFFFFLLR
FBFBFBFRLL
FBBBBBBLRR
BBFFFFBLRR
FFFFBFBRRR
FBBBBFBRLL
BBFBFBBLRR
FFBBFBFLLL
BFBBFFBLRL
FFFBBBBRRR
BFBBFFFRLL
BFBBBFBRRR
FFFFBBFRLR
FFBBFBFLRR
FFFFFBBLLR
BBFBBFBRLL
FBFBBBBRLR
BBFFFFBLRL
FBBFFFBLLR
FFBFFBBLLL
FFFBBBFLLR
FFFBBBFRRR
FFBBBFBRRR
FFFBBFFRRR
FFBBFFBLLR
BFBFFBFRRR
FFBFBBFLLR
BFFFFFFRRR
FFBFFBFLRL
BFFBFBBRRR
FBFBFFFRLL
BBBFFFBLLL
BFBBFBFRRL
BFFFFFBLRR
FBBBBBFRRR
FFBBBBFLRR
BBFBBBBLRR
BBFBFBFLLR
FFFFBBFRRR
FFBBBBBLLR
BFFFBFBRLR
FBBBFFBLLL
FFFFFFFRRR
FFFBFBFRRL
BFBBFBBLRR
FBBBBFBLRL
FBBBBFBRRR
BFFFFBFRRR
BFFBBFFLLL
FBBFBFBLRL
BFBBFFFRRL
FBFBFFBRLR
FBFFBFFLRR
BFFFBFBLLR
BFBBFFBRRR
BBFBBFBLLL
BFFBFFFLRR
FFFBBFFRLL
BFBBFFFLLL
BFFFBBBRLL
FBFFBBFRRR
FFBFBFBLLR
FBFFFFBLRR
FFBBFFFLLL
FFFBBBBRRL
BBFBFFFLLL
BBFFBBFLLR
BFBFBBBRRR
FBBBBFBRRL
FBFFFBFLLR
FBFBBBFRRR
BFFFBFBRRL
FBFBBBFLRL
BBFFBFFLRL
BBFBBFFLLR
FFFFBFFRLL
FFFBBBBLRL
FBBBFBFRLL
BBFFFBBLRL
FFFBFFBLRR
BBFBFBBRRL
FFFFBBBRRR
FFBBBBBLRL
FFFFFFBLLL
FBFFFFFRRL
FFFFFBBLRR
BFFFBBBRRL
FBBFFFFLRL
FFFFFBBRLR
FFBFFBFRLL
FFFBBBFRRL
BFBBBFFLRL
FFFFFBFLRR
BFBFBBBRLR
FBFBBBFLLL
BFBFFBFLRL
FFBFBFFRRR
FFBBFFFRLL
BFBFBFFLLL
FBFBFBBRLR
BFFBBBFRRL
FBFFBBBRRR
FBFBFBBLRR
BFBBBBFLLR
FFFBFFFRLR
BFBBFFBRRL
BFFFBFFLRL
BFBFBBFRRR
FBBFFBFLLL
FFFFFFBLRR
FBFFBFBLRR
FFBBBFFLRR
FBBBFFBRLL
BFFFBBBRRR
FFBFFFFRLL
BBFFFBFRRR
BFFBFBBLLL
BFBBFFBRLR
FFBFBBBLRR
FFFBFBBLLL
FFFBBFFLLL
FBBBBBBLRL
BFBFBBBLLL
BFBFFFFRRL
FFBFBBFRRR
FFBFBFBRRL
FFFBBBBRLL
BFFBFFBRLL
BBFFFFBRRL
FFBFBFBLLL
FFBFBFBRLL
FBFBBBFRRL
FBFFBBFRLR
BBBFFFFLRL
FBFBFFFRRL
FFFBFBFRLR
FBFBFBBRRL
BFBBFBBLLL
FFBBBBBRLL
BBFFBFBRRL
FFFBFFFRRR
FBBFBFBLLL
BFFFBFFRLR
FBFBFFBRLL
BBFBBFFLLL
FBBBBFFLRR
FFBBBFFLRL
FBBBFFBRRR
FFBBFBBRLR
FBFBBFFLLR
BFBBBFFLLR
FFFBBFFLRR
FBFFBFFLRL
BFBFBFFLRR
BBFBFFFLLR
FFFBBBBLLR
FFBBFFBRLL
BBBFFFBRLL
FBFFBFBRRL
BFBFFFFRLL
FBFBFBFRLR
BBFFFFFLLL
FFBFBBBLLR
FFBFBFFLRR
FBBBBFBRLR
FFBFBBBRLR
BFFBBBBLRL
FFBBBBBRLR
BFBBBFFRRR
FBFBBFBRLL
FFBFFFBRRL
BBFBFBFLLL
BFBBBFBRLR
BFBBFBFLLR
FBBFBFFRLL
FFBFBBFLRR
BFFBFBFRLL
FFBBFBBLRL
FBFBFBBLRL
BBFFFBFLLR
BFBFBBBLRR
BBFFBBBLLR
BBFFFFBRRR
BFFFFFBLRL
FBBBFBBRRR
BFBFFFBLLL
FFFBBFFLLR
BFFBBFFLLR
BBFBBBBLRL
FBBFBFFLRR
FBFBFFBLLR
BFFFFFFLLL
BFFBBFFRLL
BBFFFFFLLR
FBFFBBFRRL
FBBFFFFLLR
BFBFFBBRRL
FFBFFFBLLL
BFFFFFBLLR
FFBBBFBRRL
FFBBBBFLLR
BFBFFFBLLR
FFFFBFFRLR
BFBBFFBRLL
FFBBBBBLLL
FBBFBFFRRR
BFFFFFFLLR
FFBBBBBLRR
FFFFFBFRRR
BFFFBBBLLL
BFFFBFFRRR
FFBBBFBRLR
BFFBBBBLRR
BFBBBFFRRL
BFBFBFFRRR
BFBBFBBRLR
BFBBBBFRLL
FFBBBBFLLL
FFFBBFBLRR
FBBFBBFRLR
BBFBBFFLRR
FBBFBBBRRL
BFFBFFFRRL
BFFFFBFLRR
FFBFBBFLLL
FFBFBBBLLL
FBFFBFBRRR
FFFBFFBRLL
BFFFFBFLRL
FFFFBFFLLR
BBFBBBBRLL
FBFBBFBRRR
BFFFBBBLRR
FBFFFBFRLL
FFBBBFBLRL
FBFFFBBLRR
FFBBFBFRLR
FBBBBBFLRL
FFFFBFBLRR
BFBFBFBLRR
FFBBFFFLRL
BFFBBBFLLR
FFFFFFBRLR
FFBBBFBLRR
FBFBBFFRLL
BBFBFBFRLR
FBBFFFFLLL
BFBBFBFRRR
BFFBBBFRRR
FBFFFBFLRR
FBBFFBFLRL
BFBBFFFLRR
FFBFFFFLRL
BFFBFFBLLL
FFFBFBBRRR
BBFFBFFLRR
BBBFFFFRRL
FBBBFFBLRL
FBBFFBBLRR
FFBFBFFLLR
FFFBBFFRLR
FBBBFBBRLR
FFFFBBBLRR
BBFFBFBRRR
FBFBBFFLRL
FBBBBFFLLL
FFBFFBBRLR
BBFFFFFLRR
FFBFBFBRLR
FFBFBFBLRL
FBBBFBBLRL
FFFBFBBLRL
FBFBFFFRRR
BFFBFFFRLR
BFBBFFBLLR
BFBFFBFRLL
FBFBFBFRRR
FBFFFFBRLL
FFFFFBBRRR
FBBBFFFLRL
FFFBFFBRLR
BFBFFBFLRR
FBBFBBFRRL
BFBBBBFRRR
BFFFFBBLRR
FBFFFFFLLL
BFBFFFBRRL
FFFBFFBLRL
FFBFFFBLRR
FBBFFBFRLL
BBFBFFBLLL
BBFFBBFLLL
FFBBBFFRLL
BFBBFFFLRL
FBBFBFFLLR
FBFBFFBLLL
FFBBBFFLLR
FBBFFBFLRR
FBBFBBFRRR
BFFFFBBLLL
FFFBFFBLLR
FBFBFFFRLR
FBFBFBBRRR
FBFBBFBRRL
BBFBBFBRRR
FFFFBBBRLL
FBFFBBBLRL
BBBFFFFRLL
FBFFFBFLRL
BFFFFBFLLR
FBFBBFFRRL
BFFBFBBLRR
FBFBBBBRRL
FBFBFBBLLR
FBFFBBFLRR
FFFFBFFLLL
BFBFFFFRRR
BBFFBBBLRR
FBFFFFFLLR
BBFBFFFRLR
BFFFFBBRLR
FBFFFFFLRL
FBBBFBBLRR
BFFBBFBLLL
BFFBFBBLRL
BFFBBBFRLL
FFBFFBFRRR
BFBFBFBRLL
BBFBBFBLLR
FBFBBFBLRL
FBFFFBBRLR
BBFBFFBRLL
BBFFFBFRLR
FBBFFFBLLL
BBFBBBBLLL
BFFFFFFLRR
FBBBBBFRLL
BFFFBFBRRR
BFFFFFFLRL
FBBBBFBLRR
FBFFBBBRLR
FFBBFBFRRL
FFBBFBBRRL
FFFBFBFRRR
FFBBBBFLRL
BFBBFFFRRR
FBFBBBBRLL
FBFFBBFRLL
FFBFFFFRRR
BFFFFBBLLR
FBFBBFBLLR
BBFFBBBRRR
FBBFBBBRLR
BFBFBFFRLL
BFFBBFBLRL
BFFBFFFRRR
FFBBBFBRLL
FBFFBFFRRL
FBBBBFFRRR
FFFBBBFRLL
BBFFFBBRLL
BBFFFBBRLR
FFBBFFFRRL
BBFFBFBLRR
BBFBFFBRRR
BFBBBBBLRR
BFFBBFFLRL
BBFFFFBLLL
FFFFBFBRRL
FBBFFBBRRR
FBBBFFFLRR
FBBFBBFLRR
FBBBFBBLLL
FFFFBBFLRL
FFFFFBBLLL
BFBBBBBLLR
BFBFFFFLRR
FBFFFFBLLR
BBFFBBBRLL
FBFFBFFRRR
FFBBFBFLLR
BBFBBBFLRR
FBBBBBBRLL
FFFFFFBLLR
FFFFFBFRLR
FBFFBFBRLL
BBFFBFFRRR
BFFBFFFLLR
FFBBFBBLRR
BBFFBBBRLR
FFBBFFBRRL
FBBBBFFRRL
BFBFFFFRLR
BFBBBFBLLL
BFBFFFBRRR
FBBBFFFRLR
BFBBFFBLRR
BBFBBFFRLR
BBFFFBBRRR
FFFFBBBRRL
FFBFBBFRLL
FBFFFFBRRL
FBBBFFBRLR
FFBFFFBRRR
FBBBBBBLLL
BFFBFFBLRL
FBFFBBBRLL
BBFBBBFRLR
BFBFBFBRLR
BBFFFFBRLL
FFBBFBBLLR
FFBBFFBRLR
BBFBBBBRLR
BFBBBFBLLR
FFFFBFFRRR
BBFFFBFRRL
FBBFBBBLLL
FFFBFFFLRL
BFFFFBBRRR
FFFBFBFLRL
BBFFBBFRRR
FBBFFFFLRR
FFFBBBFLRL
BFFBBBFLLL
BFBBFFBLLL
FFFFFFBLRL
FBFFBFFLLL
FBBBBBBRRR
FBBFFBBRLR
BFFFBBBLLR
BBFBBBBRRR
BFBFBFFLLR
BFBFFBFRLR
FBBBFFFRRR
FFBFBBFRLR
FFFFFBFRLL
FFBFBBBRRR
BFBFFBBLLL
FBBBBBFRLR
FFBBFBBLLL
BFBFFBBLRL
FBBFBFBRRL
BFFBBBBRRL
FBBFFFBLRL
FBBFBFBLLR
FBBFBBBLRR
BFBBBFBRRL
FBBBFBFLLL
BFFFBFFLLR
FBBBFBFLRR
FFBFFBBLRL
BBFBBBBLLR
BFFFBFFLLL
FBFFFFFLRR
BBFBFBBLRL
BFBFBBFRRL
FBFBFFBLRR
BFFFFFFRRL
BFFFFBFRLR
BFBBFBBRLL
BBFFFFFRLL
FFBBFFFLLR
FFFBFFFLRR
FFFBFFBRRR
BBFBFFBLLR
BFFBFFFRLL
FBFBFFBRRL
BFBBBFFLLL
BBFFBFBLRL
FBFBBFFLRR
FBBFBBBRRR
FFFBBFBRLL
FBBFBFBRRR
BFFFBBFLLL
FBBBFFBLRR
BFBFFBBRRR
FFFFFFBRLL
BBFFFBFLRL
BFBFBFBRRR
BFFFBBFRLR
BFBFFFBLRR
FFFBFFBRRL
BBFFFBBRRL
BFBBBFBRLL
BFBFFFBLRL
FFFBFFFLLR
BFFBFFFLRL
BBFBBFBLRR
FBBBFBBRRL
FBBFBFFRLR
FBFFFFFRLR
FBBBBFFRLR
BFBFBBFRLL
BBFBFBFRRR
BFBFBFBRRL
FBBBBBBRLR
BFBFBBFLLR
BFFFBBFRRL
BBBFFFFRLR
BBBFFFBLLR
FBFBBBFLRR
FBFFFBBLRL
FBFFBBBLLR
BFBFBBFLRR
BFBBFBBLRL
BFFFFFBRRL
FFBBFFFRLR
BFFBBFFRLR
BFBFBFBLRL
BFFBFBFRLR
FFBBFFBRRR
BFBBBBBLLL
BBFFFFFRRL
BBFFFFFLRL
FFFBBFFLRL
BFBBFBFRLL
FFFBBBBLLL
FFFFFBFLRL
FFFFBBFLRR
FBFFFBFRRR
BFFBBBBLLL
BBFBBFFRRL
BFFFBBFLLR
FBBBFFFLLL
FFBFFBBRRL
BFBBBFBLRR
BFFBBBFLRL
BFBBBBBRLL
FFFBBBFRLR
FFFFBFFRRL
FFBFBFFLLL
BBFBFFFLRL
BFFFBBFLRR
FFFBFBFRLL
BFBFFBBLRR
FFFBFBBLLR
BBFFFFFRLR
FFBFBFFRRL
FFFFFBBLRL
FBBBFBFRRL
FBBBBFBLLL
FFFFBBBRLR
FBBBBFFLRL
BFBBBBBRRL
BBFFBFBLLR
FBFBFFFLRL
FBFFFBFRRL
FFFBBFBLRL
BFFFFFBLLL
BFFBFBFLLL
FFFFBBFRRL
FFFBFBBRLR
FBFBBBBRRR
FBFFBBBLLL
FFBBBBFRRR
BFFFFBFRLL
BBFBFBBRLR
BFFBBBFLRR
FBBFBFFRRL
FFFFFBFLLL
BBFBFBFLRR
FFBFBBFLRL
BFFBBFBRLR
FFBBBFFRLR
FFFBBFBRLR
FBFBBBBLLR
BFFBBBBLLR
BBFBFBFLRL
BBFFFFFRRR
FFFBFFFRRL
FBBFFBFRRR
BBFFBFFRLL
FFBBFBFRLL
FFFFBFBLLR
BBFFBBFRLL
BFBBBBFLRL
FBFFBFFRLR
BFBFBBFLLL
FFFFBBFLLL
BFBBBBBLRL
FFBFBFBLRR
BFFFFFBRRR
FBFBBBBLRL
FBBFBBFLLR
FBBFFFFRRL
FBFFFBFLLL
FBFFBBBRRL
FFBFFFFRLR
FBBFBBBRLL
FFFFBFBRLR
FFBFBBBRRL
BFFBFBFRRL
FFBFFBFLLL
BFFBFBFLRR
BBFBFFBLRL
BBFFBFFLLR
BFBBBBFLLL
BBFBBFFRRR
BBFFFBBLRR
BFBFFBFRRL
FBBFBFBLRR
BBFBBBFRRR
FFFBBFBLLR
FFFBFFFLLL
FBBBFBFLLR
BFBBFBFLLL
BFBFBFBLLL
BBFFBBFLRR
FFFBFBFLRR
BFFFFFFRLR
BBFBFBBRRR
BBFFFBFRLL
FFFFBBFRLL
FBBFBBFRLL
FBFFFFBRRR
FBFFBBFLLR
BFFBFFBLLR
FFBFFBFLRR
FBFFBFBRLR
FBFBBFFLLL
FBBFFFBRRL
FBFBFBFRRL
FFBFBFBRRR
FBFBFBFLRL
FFFBFBBRLL
FBBBFFFLLR
FFBBBBFRLL
FBFFFBBRLL
BFFBFFBLRR
FBBFBBFLRL
FBFFFBBRRR
FBFFFBBLLR
BFFBFFBRRR
FBBBFBFRRR
FBFFFFFRLL
BBFBBBFRLL
FFFBFFBLLL
FFBFFFFLRR
FBFFFBBRRL
BBFFBFFRLR
FBFBFBBLLL
FBBBBBBLLR
FBFBBFBLLL
BBFBFFFLRR
BFFFFBBRRL
BBFFFBFLRR
FFBFFFBRLL
FFFFBBBLRL
BFBBBFFRLL
BBFBFFFRLL
FBFBBBBLLL
BBFBBFBRLR
BBFFBFBRLR
BFBFFFFLRL
FBBBFBFRLR
FFBFFFBRLR
FBBBBBFLLR
FFBBBFBLLR
BFFBBFBRRL
BBFFBFFRRL
FFFFFFBRRR
FFBBFBBRRR
FBBBBBBRRL
BFFBBFFRRL
FBBFBFBRLR
FBBFFFFRLL
FBBBBBFLLL
FBBFFFBRRR
BFFFFBBLRL
FFFFBFBLLL
FBFBFFFLLL
FBFBBFBLRR
FFFFBFFLRR
FFFBBBFLRR
FBFFBFFLLR
BBFFBFFLLL
FFBFFBFRRL
BFBBFBBRRR
BBFFFBFLLL
FBFFBFBLLL
BFFBFFBRRL
BBFBFFBLRR
FBFBFFFLRR
BFBBFBBLLR
BFFBBFFRRR
FFFFFFBRRL
BBBFFFFLLR
BFBFFBFLLL
FBBBBBFRRL
BFFBBBBRLR
FFBBFBFLRL
FBFBFFBLRL
FFBBBBFRLR
BBFBBFBRRL
FFFFFBFLLR
FBFBFBFLLL
BFBFBFBLLR
FFFBFFFRLL
BFFBBFBLLR
FFBBFBBRLL
FFFBBFBRRL
FBBFFBBLLL
FFFBBBBRLR
FFFBBFBRRR
BBFFBBBRRL
FBBFBFFLRL
FBBBBBFLRR
BBFBFFBRRL
FFFBFBFLLL
FBBBFFFRLL
BFFBFBFLLR
FFBBBBBRRL
BFFBBFFLRR
FBBFBFBRLL
BFFFBFFRRL
BBFFFFBLLR
BBFFBBFRLR
BFFFBBFRRR
FBFBBFBRLR
FFFFFBBRLL
FBBFFFBRLL
BFFFFFBRLL
BFFFBFBLRR
BFFBFFBRLR
FFFFBFBLRL
FFBFFBFLLR
FBBFBFFLLL
BFFBFBFRRR
BBFBBBFLRL
BBBFFFFLRR
BFBBFFFLLR
FBBFFFBRLR
FFFFFBFRRL
FFFBFBBRRL
BBBFFFBLRR
FFBFBBFRRL
FFBBFFBLRR
BBFFBBBLLL
BFBFBBBRRL
BFFFBFBRLL
FFBFBBBRLL
FBFBFBFLRR
FBFFFBBLLL
FBBFFBFLLR
BFFFFBFRRL
FFBBBFFRRL
FFBFBFFLRL
BBFBBBFLLR
FBBFFBFRLR
FBBFFBBRLL
BFBFFFBRLR
BFFFBFFRLL
BBFBFBBRLL
BFFFFFFRLL
FBFBBBFRLL
BFBBFBFLRR
BFBFBBBRLL
BBFBBBFRRL
BFFBBFBRRR
BFBFFBFLLR
FBFBFBFLLR
FFFFFBBRRL
FBFBBBFRLR
FBFFBBFLLL
FFBFBFFRLR
BBFBFBBLLL
FFFFBFFLRL
FBBFBBFLLL
BFBFBBFLRL
FFFFBBFLLR
BFBBFBBRRL
FBBBFFBRRL
FBBBBFFRLL`;


/***/ }),

/***/ "DMSO":
/*!****************************************!*\
  !*** ./src/app/solution-code/day18.ts ***!
  \****************************************/
/*! exports provided: dayEighteenPartOne, dayEighteenPartTwo, dayEighteenInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayEighteenPartOne", function() { return dayEighteenPartOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayEighteenPartTwo", function() { return dayEighteenPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayEighteenInput", function() { return dayEighteenInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayEighteenPartOne(input) {
    function toPostFixNotation(line) {
        let operationStack = [];
        class OpenBracketState {
            constructor(afterBracketOps) {
                this.afterBracketOps = afterBracketOps;
                // internal state of the inner side of the brackets
                this.state = new NullState();
            }
            read(char) {
                if (this.state instanceof OpenBracketState) {
                    this.state = this.state.read(char);
                    return this;
                }
                if (char === ')') {
                    operationStack.push(...this.afterBracketOps);
                    return new NullState();
                }
                else {
                    this.state = this.state.read(char);
                }
                return this;
            }
        }
        class OperationState {
            constructor(operation, left) {
                this.operation = operation;
                this.left = left;
            }
            read(char) {
                const charCode = char.charCodeAt(0);
                if (charCode >= 48 && charCode <= 57) {
                    if (this.left)
                        operationStack.push(this.left);
                    operationStack.push(Number(char));
                    operationStack.push(this.operation);
                    return new NullState();
                }
                else if (char === '(') {
                    return new OpenBracketState(this.left ? [this.left, this.operation] : [this.operation]);
                }
                throw new Error(`Unknown operation in state ${this.constructor.name}`);
            }
        }
        class LeftNumberState {
            constructor(left) {
                this.left = left;
            }
            read(char) {
                switch (char) {
                    case '+':
                    case '*':
                        return new OperationState(char, this.left);
                    default:
                        throw new Error(`Unknown operation in state ${this.constructor.name}`);
                }
            }
        }
        class NullState {
            read(char) {
                const charCode = char.charCodeAt(0);
                if (charCode >= 48 && charCode <= 57) {
                    return new LeftNumberState(Number(char));
                }
                else if (char === '(') {
                    return new OpenBracketState([]);
                }
                else if (char === '*' || char === '+') {
                    return new OperationState(char);
                }
                else
                    throw new Error(`Unknown operation [${char}] in state ${this.constructor.name}`);
            }
        }
        let state = new NullState();
        for (const letter of line) {
            if (letter === ' ')
                continue;
            state = state.read(letter);
        }
        return operationStack;
    }
    function calculatePostfixResult(stack) {
        let memoryStack = [];
        const popSafe = () => {
            const poppedValue = memoryStack.pop();
            if (poppedValue === undefined)
                throw new Error('Attempted to pop a value from the stack but there was no value left!');
            return poppedValue;
        };
        for (const item of stack) {
            switch (item) {
                case '*':
                    memoryStack.push(popSafe() * popSafe());
                    break;
                case '+':
                    memoryStack.push(popSafe() + popSafe());
                    break;
                default:
                    memoryStack.push(item);
            }
        }
        return popSafe();
    }
    const reader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const operations = reader.readLineByLine(toPostFixNotation);
    const results = operations.map(calculatePostfixResult);
    const sumOfResults = results.reduce((prev, curr) => prev + curr, 0);
    return sumOfResults;
}
function dayEighteenPartTwo(input) {
    function toPostFixNotation(line) {
        let operandStack = [];
        line += ')';
        let arithmicExpressionStack = ['('];
        function peekArithmicExpressionStack() {
            return arithmicExpressionStack[arithmicExpressionStack.length - 1];
        }
        for (const letter of line) {
            if (letter === ' ')
                continue;
            switch (letter) {
                case '(':
                    arithmicExpressionStack.push('(');
                    break;
                case '+':
                    while (peekArithmicExpressionStack() === '+')
                        operandStack.push(arithmicExpressionStack.pop());
                    arithmicExpressionStack.push('+');
                    break;
                case '*':
                    while (peekArithmicExpressionStack() !== '(')
                        operandStack.push(arithmicExpressionStack.pop());
                    arithmicExpressionStack.push('*');
                    break;
                case ')':
                    let entry = arithmicExpressionStack.pop();
                    while (entry && entry !== '(') {
                        operandStack.push(entry);
                        entry = arithmicExpressionStack.pop();
                    }
                    break;
                default:
                    const number = Number(letter);
                    if (Number.isNaN(number))
                        throw new Error(`Invalid operator received: ${letter}`);
                    operandStack.push(number);
                    break;
            }
        }
        return operandStack;
    }
    function calculatePostfixResult(stack) {
        let memoryStack = [];
        const popSafe = () => {
            const poppedValue = memoryStack.pop();
            if (poppedValue === undefined)
                throw new Error('Attempted to pop a value from the stack but there was no value left!');
            return poppedValue;
        };
        for (const item of stack) {
            switch (item) {
                case '*':
                    memoryStack.push(popSafe() * popSafe());
                    break;
                case '+':
                    memoryStack.push(popSafe() + popSafe());
                    break;
                default:
                    memoryStack.push(item);
            }
        }
        return popSafe();
    }
    const reader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const operations = reader.readLineByLine(toPostFixNotation);
    const results = operations.map(calculatePostfixResult);
    const sumOfResults = results.reduce((prev, curr) => prev + curr, 0);
    return sumOfResults;
}
const dayEighteenInput = `5 + 9 + 3 + ((2 + 8 + 2) + 8 + 9 * (4 * 2 * 5) + 6) * 4
7 + ((9 * 5 + 9 + 2 * 7 * 6) + 3 + (3 + 2 * 8 + 6) * 6 + 4 * 8) + 5
9 + (6 * (4 * 8 + 2 * 4 + 8 + 6) * 4 * 5 * (7 * 8 * 9 + 3 * 4) + 8) + ((2 + 7 * 5 + 8) * 5 * (3 + 8) + 5 + 8 * (7 + 8)) + (2 + 2 + 5 + 7 + 7)
6 + (5 * 7 * (6 * 4 * 5 * 3 + 2) + 3) * 3 + 6
9 + 3 + 7 + (5 * (7 * 8 + 3 * 8) * 2)
2 + 4 + (3 * (8 + 2 + 9) + 5 * 6 * 3 * (6 + 9 + 5 * 9 * 9 + 4)) + 8
6 * 3 + 8 + 3 * (9 * 2 + 5 + 4) + 2
2 * (9 + 9 + 5) * 8 + 5 + 6 + 3
3 + (2 + 3 * 3 * 3) + 2 * 3
(7 + 3 + 5 * 9 * 5 * 5) * 5
3 + 7 * 9 * 7
((9 + 5 + 2) * 7 * (2 + 7 * 8 * 7 * 8 + 3)) * 2 * (2 + 3)
2 + 7 * (2 * (5 + 8 + 5 * 7 * 2 * 7) + 2 + 6) * 6 + 2 * 6
(8 * (6 * 3 + 7 + 8 * 4 * 5)) * (9 + 8 * 8 + (9 + 2) + 6) * 7 + 5
3 + 9 + 9 * 5 + 4
7 * ((4 + 9 + 6 + 9 + 5 + 7) * 8 * 7 + 3 + 7 + 6) * 5 * 3 + 8
(2 * (8 + 5 + 5 + 7) + (2 + 9 + 8) * 8 * 8 * (4 * 8 * 7)) * ((6 + 2 + 7 * 2) * (4 * 2 + 9) + (4 + 3 + 8 + 8) + 4 + (2 * 4 * 9 * 9 + 4 + 6)) + 4 * (6 + 3 + (6 + 5 * 6 + 9)) + 9 + 7
4 * 3 + 6
8 * 8
4 + 6 * 6 + 7 * (4 * 2 * 4) * 5
7 * 6 * 8 * 3 * 9
8 + 2 + 4 + ((4 + 9) * 8 + 4 * 4 * 4 * 2)
5 * (5 + 3 + (6 * 6) * (9 * 8 * 4 * 6) + 5 * 8) * (4 + 9 + 2 * (3 + 4) * 2)
(4 + (8 + 4 + 3 + 4 * 7 + 2) * 4 * 8 + 9) * 5 + 4
8 * 6 + (3 + 7 * (7 * 3 + 5 * 4 + 6 * 9)) + 6 * 8
8 * (9 * 4 + (5 + 4 + 3 + 3 + 4)) * (4 * 9)
6 + ((7 + 3 * 4) + (7 + 6)) * ((6 + 6 + 7) + 7 * 9 * (8 + 4 + 7 * 3))
3 * (3 + (3 + 2 * 3 * 5 + 3) * (9 + 8 + 3 * 3 + 8 + 7) + 9) + 3 + 8 * 4 + 4
2 * (5 * 2 + 2 + 8 + (3 * 9 * 5 + 9 * 4) + (2 + 6 * 3 + 8 * 5)) + 3 * 5
4 + 8 * (6 * 6) + 7 * 4 + 2
(3 * 8 * (3 + 2 * 3 + 5 + 5) * 4 * (4 * 2 + 5 * 6 + 2 + 6) + (7 * 7 + 7 * 4)) + 3 * 6 * 8
3 * 8 + 3 * ((5 + 5 * 5 * 8 * 2) * 2 * (9 * 8 * 8) * (6 * 5 * 8 * 3 + 6 + 8) + 6 + 6)
((9 + 7 * 2 * 7 * 2 * 9) * 2 * 8 * 5 + (7 + 4 + 9)) + 8 + 5 * 3 + 3
(2 + 5 + 9 * 7 * 4) + (4 * 3 + 8 * 2)
5 * (8 * 3 * 6 + 8 + (7 + 9 + 4 * 7) * 2) + 5 * 9 * 7
4 + 5 + (9 * 9 + (4 * 6 * 6) + (4 + 5 + 8 + 9 * 2 * 6) * 2 + 4) + ((5 + 6) + (4 * 7 * 5 * 9 * 5 * 6) * 6 * 2 + 4 + (9 * 7 * 5 + 7)) * (7 * (6 + 3 * 5 + 4))
(4 + 8 * 7 + 5 + 7) * 4 * 7 * 8 * 8 + 6
6 * 2 * (5 * 7 + 9 * 7 + 5 + 3)
9 * 5 * 7 + 8 + (5 + 2 * 7 * 8 + 2) + 5
6 + 3 + 2 * 4 + (8 * 9 + 4 + (9 + 5 + 2 * 3)) + 4
(8 + 9 + (6 * 4 * 9 + 6) * 9 + 3) * 6 + (7 + 7 * 6 * 8 + 4) + 4
(9 + (7 * 9 * 6 * 3 + 9 * 7) * 8 * (9 + 4 + 8 + 9) + (6 * 8 * 7 + 6 + 2) * 5) * 8
7 + (9 * 6 * 3 + 8) + 5
9 * 2 + (2 * 9 * (3 * 5)) * (9 + 5 * 7 + (2 * 2 + 7 * 5 * 2 * 2) * 9)
(4 + (5 * 2 * 3)) + 8 * 8 * 6 * 6
(4 + 7 + 6 + 6 * (9 * 5 + 9 * 6 * 7)) * (4 * 3 * 5) * 9 * 3 * 7 + 4
(6 * 6 + 5) + 5 * (7 + 7 * 5 + 4)
(6 + 7) * 4 + 3
4 + 5 * 6 * (8 + (5 * 2) + 8 * 4 + (4 * 6 * 3 * 2) * 8)
8 * (8 + 4 * (2 * 5 + 9 * 8 * 6 * 9) * 3 + 2 * 5)
(4 * 3 * 6 * 7) * 4 + 4
((8 + 8 * 5 + 2 * 5 * 9) + 3 * (3 + 7 * 6 + 5 + 2)) * 3 * 7 + 4 + 6 * 6
4 * (7 + 6 + 7 * (4 + 9 + 8 + 9))
2 + 9 * 5 + (7 + 6 + 5 * 9) * 9
(3 * 3 * 4) * (2 + 3) + 2 * 7
7 * 6 + (2 + 5) + 4 * 3
8 + (2 * 3) * 7 + 4 * 3 + 6
4 * (6 + (6 + 7 * 8 + 7))
6 * (7 + 5 * (2 + 9 * 8 * 8 + 2 * 3) * (3 + 2 + 9) + 5 + 5)
7 + 6 + (7 * 2 * 9 * 9 + 5) * (6 * 9 + 2 * 2 + 2 * 3) * 5 + 2
5 + 4 + 8 * (2 + 2 + 7 + (7 + 6 + 9 + 5 * 7 + 3) * 7 + (2 * 6 * 6))
3 * (4 + (2 * 6 + 3) + 2 * 2 * 5) + (7 + 2)
(3 * (9 + 3 + 7) * 5 * 8) * 2 * ((6 + 7 + 2 * 7 * 9) + 4 * 5 + 9 * 7) + (6 * 2 * 4 * 8 + (5 * 4 + 4 * 3 * 2) + 5) + 2 + 5
(7 + 6 * 8 + 3 + (7 * 2)) * 5 + 5 * 6 + 8
(6 + 3) + (9 * 7 + 3) + (8 * 4) + 9 * 9 * (3 * 3 + (5 * 3 + 9 * 7 * 3))
5 * 2 * 5 + 2 + 5 * 6
((2 + 9 * 8 + 2 * 2 * 4) + 5 + 6 + 4 + (6 + 3 + 2 + 6 * 2)) + 4 + 8 + 6
8 + (8 * 5 * 6) + 5 + 6 + 5
8 * 3 + 7 * 6 + 5 * ((6 * 9 + 5) + 7 + 5 * 2)
(7 + 2 + 5 * (4 + 9 + 5 * 3 * 3) + 2 * (9 + 5 * 3 * 7 + 5 * 5)) * 5 * 3 + 3 * 7
8 + (3 * (4 + 9 * 2 * 4 * 6) + 8 + 5) + 9 + ((2 + 4 * 6 * 4) * 3) + 3
(6 * 9 * 3) + 8
4 + ((6 * 2 + 7) * 4 * 2 + (5 + 9 * 8 + 9) * 9) * 9 * 8 + (6 + 5 + 7 * 7 + (3 * 9 * 3 + 2) * (5 * 2 * 2 * 8 + 2))
4 + ((2 + 7 + 6 + 5) * 8 * 9 * 7 + 5 + 3) * 8 * 2
7 * 2 * 6 + 2 * ((5 * 7) * 6 * (9 + 6 + 7) * 4 + (9 + 7) + 9) * (6 * 3 + 3 + 2 * 8)
5 + 7 + 8 * 2 + (6 * 3 * 7 + 6 * 2)
9 * 7 * 6 * 8 + (4 * 2 * 5 + 4 + 9 + 3)
4 * 5 + (8 + 5 * 4 + 3 * 8) * 3 + 4 * 2
6 + 9 + (2 * (5 + 2 * 9 + 4) * (2 * 9)) + (7 * 5 + 7 * 4 + (8 * 3 * 7 + 4 + 3) + 9)
((6 * 6 * 2 * 6) * (6 + 5) + 7) + 6 + 8
3 + 9 + (5 * 7 + 9 + 5) * 2 * 5 + 2
4 + 6 * 7 + 4 * 9 + ((9 * 2 + 5 + 3 + 8 * 2) * (9 + 3 + 3 * 2 * 2) * 9 * 2 + 7)
8 + 6
6 + 6 * 5 * (7 + 6 + 4) + 2
9 + 7 + (4 + 5 * 2 * 3) * (6 + 3 + 8 + 6 * (2 + 9 * 2 * 9 * 7 * 5)) * (8 * 7 * 7 + 4 + (7 * 5 + 2) + (7 * 8)) + 7
6 * 9 + 3 + 6 + 9
5 * (6 + 7 + 8 + (3 + 7 + 4 * 7) * (2 * 5)) + 2
(8 * 8 * 5) * ((6 + 7 * 6 * 6) + 4 * 8 + 4 + 9) * (9 * 9 + 4 * 2 * 3) * 8
9 * 9 + 7 * 6 + (9 + 7 + 9 * 9)
2 + 9 + (5 * 6 * 7 * 8 * 6 * 2) * 2 * 8 * (3 * 6)
(3 + 2 * 9 * 8) * 2 + 6 + 9 + (3 * 8 * 6)
(4 * 4) + 5
4 + 6 * 2 + 7 * 3 * 7
6 + (5 * (5 + 3 + 6) + 6 + 9) * 2 + 8 + 9
((4 * 9 + 7 + 9 * 8 * 2) * 4 + (9 * 3 + 8) + 8) * 2
8 + 2 + 7 * (8 * 9) + (2 * 9) + 4
(3 * 9 + 7 + 3) * (9 * (8 * 3 + 8 + 7 + 7 * 6)) + 7
9 * 2 + (3 * (7 + 9 * 5) + 6) * 4 * (7 + 6 + 4) + ((9 * 2 + 9 * 3 + 4 * 3) + 5 * (7 * 2 + 9 + 3 * 9) * (6 * 2 + 4 + 6) * 7)
9 * 3 * (7 + 8 * 8) + 9 + 7 * 9
(8 + 4 * (2 * 2)) * ((7 + 8 + 8 * 5 + 6) * 2 + 5 * 4)
(2 + 2 + 6 * 5 * 2 + 4) * 9 * 7 * 2 + (6 * 8 * 5 + 6 + 3)
4 * ((5 + 8 + 4 * 3 + 6) + 9 * (5 * 2 + 9)) * 9 + 8
9 * 5 + 9 + ((7 * 3) * (7 * 4 * 3 * 2) * (9 * 9 * 5) * 2) + 8 * (5 + 4 + 9 + 6)
2 + 6 + (7 * 8 + 3) + 3
(7 + 4 + 7) * 3 * 7
((8 * 8) * 7 + 2 + 5 * (6 * 4 + 4) + (3 + 4 * 8)) * 4 * 8
9 * ((5 * 2 * 5 + 8 * 7) * 2 + 7)
2 + 8 + 8 + 3 * 5
7 + 6 * (6 * 5 + (2 + 6) * 2 * (5 * 6))
5 * (2 + 2 + 2 * 9)
9 + 6 * 4 + (6 * 6 + 4 * 9 * 8 + 8) * 5 + 6
4 * 3
8 * 3 + 7 * 2 + (2 * 3 + 3 * 7 * (4 + 7 * 9 * 7 * 2 * 3))
(9 * (8 * 9)) + 4 + 8 + 5 + ((2 + 5) + (6 + 2 + 2 + 2 * 8) * 6 + 5)
9 + 8 + ((5 * 7) + 9 * 3 + 8) * 7
(3 * 5 * (2 + 4 + 3 * 7)) + 8 * 7
(9 * 5 * 9 + 5 * (7 + 4 * 8)) * 7 + 3
((6 * 9 + 5 + 8) + 6 * 5 + 9) * 2 * 9 + (8 + (8 * 2 * 2) * 4 + (4 * 5) + 3) * (4 * 4 + 6 + 5 + 6)
4 + (3 * (6 + 8 * 6 * 8 * 9) * (2 * 7 + 9 * 4 * 2)) * 2 + 7 + (6 + 9 + 6) * 2
2 + 5 + 9 * 5
4 + (9 * 2) + 5 + 3 * 6 * (9 * 3 * 2 * 9 * 7)
(8 + (2 + 8 + 5 * 7 + 6 + 5) * 4 + 9) * 4 + 6
3 + (9 + (8 + 2 * 2 + 9 + 7 + 7)) + 9
(7 + 6 * 8 + 6 + (7 + 7 * 8)) + 2
(7 * 7 + 6 * 9 * 8) + 6 + 3 + 6
(4 * 5 * 8 * 6 + 5 * 9) * (2 + (8 + 5 * 9 * 2) + 6 * 8 * 2 * 5) * 5 * 5 + 4
4 + (6 + 5 * (9 * 5 * 8 + 4 * 7 + 7) * 6) + 9 * 4 * 7 * 2
((8 + 2 + 8 * 4 * 6) * 2 + 3) + 6 + 8
(3 * 8 * 2 * (3 + 7 * 9) * 2 * 4) * (3 + 6 + (8 * 2 + 8 + 2) * (8 + 2) + 9) * (3 * 5 * 3 + 2) + 3 * 7
7 + 2 + 3 + (9 * 7)
(2 * 6 + 4 * 3 + 2) * 5 + 3 * 8 * 7 * (8 + 3 + 3 + 9)
7 * (9 * 2 + 8 + 2 * 9) + (7 * 7 + (2 * 2 + 2 * 4 * 9 + 9) + 6 + 5) * 2 * (3 + (4 + 8 * 7 * 7) + 5 * 2) * 9
6 + 5 * 7 * 6 + (2 * (6 + 6 + 2 + 9 * 5 * 3) * 5) + 2
(3 + 6 + 8 * 3) + 7 * 5 + 9 + 3
(3 + 6 + 4 * 6) * 5
4 * 7 * (9 * 9 + 7 + 2 * (4 * 4 + 4 + 9 * 8) + 5) + 8 * 7 * 7
6 + ((6 + 2) + 4 * (7 * 5 * 2) * 5 * 6)
3 + (3 * 9 + (2 + 3 + 8 * 8 * 8) + 4 * 3 + 7) * 8
(3 + 5 + 8 + 6) * 5 + ((4 * 4 * 8 + 7 * 7 + 6) * 2 * (4 * 3 + 7) * (8 + 5 * 8 + 8 + 4) + (6 + 3 + 2 + 2)) * 6 + 2 + 5
8 + ((8 + 7 * 9 + 9) + 6 * 8)
3 * (4 + (2 + 4 * 7) + 5) + 5
6 + 8 * (6 + 2 * 9) + 4 + 4
6 + (9 * 2 * (2 * 7 + 7 * 6 * 7 * 4)) + 4
4 + 4 + (5 * 8 * 4 * (4 + 4 + 6 + 4 * 3) + (6 + 7) * 6) * 8 * (5 + 7 + 4 * 7 + 9 * 4)
8 + ((8 + 5 + 6 + 2 * 6) * 4 * (3 * 5 * 5) + 9 * 8 * 8) * 8 + 2 * 5 + 6
4 + 4 * (8 * 5 + 5 * 2 * 5 * 2) + 2 + 3 * 7
6 + 4 + (9 + 4 * 3 * 2 + 7) * 5 + 5
8 * ((3 + 5) * 7 * (5 + 3 * 6 * 4) + 5) * (2 * 6 * (5 + 6) * 9) * (5 * 7 + 3 + (5 * 9 * 8)) * 6 + 7
9 + 2 * 7 * 6 * (2 + 6 * (6 * 5 + 5 + 3 + 8) * 8 + 5 * 9)
((8 + 4) * (3 * 7 + 8 * 5 + 4) + 7 * 9 * (6 + 3 * 5 * 3) * 2) * 7 + (4 * 9) * 4 + 4 + 3
9 * (9 + 2 * 5 + 4 + 8 + 7) + 2 + 9 * 3
(9 * 9 + 4 * (2 + 6 + 9) * 2) + 8 * (3 + 6 + 6) * 8 * 9 * (6 * (2 * 7 + 3) * 6)
5 * (3 * 2 * 6 + 9) * 2 * 5 + 3
((9 + 6) * 3 + 3) * 5 * 5 + 2 + ((8 + 7 + 3) + (7 + 5) * 4 * 3 * (6 + 6 + 4 + 4))
4 + (3 + 6 + 6 * 5 * 4 * 2) * (5 + 2 * 3) * (8 * 6 * 5 * 3) + 5
(7 + (3 + 3 + 9 * 4 * 9)) + 5 * 3 * 7 * 3
4 + (9 + (5 * 6 + 2) + 3 + 7) + 3 + 9 + ((5 * 8 * 6) + 8) + (6 + 4 + 8 * 4 * (9 + 2 * 4 * 5 * 6))
5 * 4 + 9 * (3 * 2 * (8 + 5 + 6 * 2 * 4) * 4) * 9
7 + 4 * 5 + (3 * 2 + 4 + 2)
2 + (6 * 8 + 3 * (4 * 8 + 4 * 2 * 3 + 6)) + 8 + 6 * 8 + (4 + 8 * 9 + 5 * 6 + 8)
2 * 2 * (3 + 7 * 8 * 2 + 8 + (8 * 6 + 5 * 8 + 5)) + 7 * 3
(5 * 5 * 3 + 8 + (6 + 9 + 2)) + 7 + 5 * 6
(4 * 5 + (6 + 4 + 6 + 4) + 5 + 7) * 5
7 + (6 * 5 * 8 + 9 * 8 * (5 * 4 * 8 + 3 + 9))
3 * (5 * 2) + 4 * 8
((5 * 8 + 6 * 4 * 4 + 7) * 4 * 6) + (9 * (4 * 2 * 6 + 7 + 7 + 6) * 6) * 2 * 5 * 2
(3 + 7) + 5 * (7 * 4 + 6 + 4 + 7 * (4 * 3 * 6 * 9 * 2)) * 5 * 6
((6 + 9) * 7) * 6 + (5 * 3 * 3 * 7 * 2 * 8) + 2
6 + (7 + 5 * 3 * (4 + 8 * 9 * 9 + 7)) + 9 * 5 + (5 * 3 * 2 * 7 * (6 + 6 + 6 * 7))
(6 + 2 + 4 * 5 * (3 * 9) + 7) + ((4 + 2 + 7) * 9) * 4 * 7 + 6 * 9
9 + 6 * (2 * 6 * (2 + 5 * 4 * 6) + 3)
(6 + (9 + 4 * 6) + 6) + 7
6 + 5 * 7
(8 * 8 * 7 * 4 * 2) + 6 * 3 + (9 + 9 + 7 + (9 + 2 * 2 * 6 * 7) + 3) * 7
4 + 4 + (3 + 9 * (2 * 7 * 7 * 3) * 6) + 4 * 4
(2 * 2 * 6) + 8 + (5 + 4) * 4 * 5
6 * 3 + 3 * 7
3 * 7 + (2 + (3 + 6 * 5 * 4 + 5 * 2) * 6 * 5 * 9) + ((8 + 2 * 2 * 5 + 2) + (2 + 4) + 7 * 7 + (3 * 3 * 5 + 5 * 4 + 3) * 7) * 6
8 + 7 + 4 * ((8 * 7 + 4) + 4) + (4 + 2 * 3) * 2
2 + 3 * 2 * (8 + (6 + 3 + 2 * 2 * 5 * 5) * 9) * 6 * 5
2 * 5 + 5 * (8 + (8 * 7) + 2 + (8 + 2 * 3)) + 6
(8 + (2 + 4 + 5) + 2 * 3) * 5
7 + 7 * (6 + 9 + (6 + 5) * 3 * 5)
2 + (5 * (9 * 5 + 4 + 3 + 8 * 9) + 9)
2 + 7 + ((2 * 8) + 4) + 7
7 * 9 * (2 * 7 + 9 + 6)
(4 + 5 + (8 + 4)) + 4 * 2 * 8 + 7 * 5
3 + 5 + 2 + 8 + 7 + 2
(2 * 6 + 8) + (2 + 3 * 6 * 5) + 3 * 4
9 * (2 + 8 + 2 * (2 * 7 + 9 + 8 * 6 + 8) * 3 * (8 + 5 + 8 + 6 + 9 + 9)) * 2 + 4
(2 + (4 * 9 * 7) * (6 + 4) * (9 * 2 * 4 + 5) + 5) + 8 * 6 + 4
(7 + (4 * 5 + 4 * 2 + 7 + 6) + 5) + 9 + 7
2 + 5 * (7 + (9 + 8) * 7)
3 * ((9 * 6) * 6 * 5 * 5 * (6 + 6 + 9 * 4 + 7 * 6)) + 6 + 2 + 2 * 9
(6 * 6 * 8 * 5 + 8) + 4 * (9 + 6) * 5 * ((9 + 7) + (3 * 6 * 8 + 5 * 4 + 7) + 9 + 5) + (2 + 6 + 9 * 2 + 8)
8 + 2 + 2 * 6 + 8
((2 + 8 + 6 * 2 + 9 + 8) + 8 * 7 + 4 * 4 + 2) + 9 + (4 * 3 + 2 + (3 * 2 + 8) + 4) + 9
3 * 7 + (5 * (9 + 6 * 5) + 4 + 6 + 8 + 2) * (3 * 7 + 3) + 8
5 * (4 + 6 + (2 * 8 + 9 + 3 + 2 * 2) * (4 + 5 * 2 * 3 * 8 * 3)) + 9
(6 + 9 + 8 * 5) + (8 * (6 + 8 + 8 + 9 + 3 * 2) * 3 + (8 * 4 + 5 + 9 + 5 * 6)) + 3 * (2 * (7 * 6 + 9 + 8 * 9 + 3) + 3 * 4 * 4) + 8 + (3 + 2)
6 + ((8 * 8 + 5 + 3 + 4 * 7) * 2 + (2 * 8 * 7)) * 4 + 7 + 9 * 8
6 * (4 + 4 + 7)
6 * (8 * 4 * 3 * (4 + 5 + 7 + 9 * 3) * 2)
9 + 8 + (5 * 2 + 9) + (8 * (3 * 9) + 3 + (7 + 8 + 4) + 3) + 7 + 5
8 + 4 * 8 * (4 + 8 * (9 * 7 * 6 + 2 + 5)) * (4 * 3)
(7 * 2 * 6 * 2 * 8) + 6
(2 * (7 + 2) + (5 + 8 * 8 + 9 + 6)) * 8 + 3 + 9 * (6 + (7 * 2 * 2 + 4) * 8 * 4 * (3 + 3 * 3 + 8 + 4) * 5) * 8
7 * (3 + 7 + 3 * (2 * 5 + 5) + 6 * 5) * 8 * 2
3 * 9 * 5 * ((4 + 5 + 3) * 6 + 8 + 9 * (6 + 6)) + (6 * 6)
(4 * 8) + (7 * 9 + (3 * 4 + 8 * 7 + 5 + 3) * (7 + 6 + 2 * 7 * 6 * 2)) + ((4 + 7 + 3 + 9) * 5) + 8
4 + (9 * 4 * 3 * 7 * 6) * 3 * 6 * 7 * 4
5 * 9 + ((8 * 8 * 6 + 2 + 4 * 3) * 5 + (7 * 5) * 6 * 5)
6 + 7 * 3 + (6 + 6 + (9 + 7 * 5 + 5)) * 7
5 + ((6 + 9) * 8 * (8 + 3 + 3 * 5 + 9 * 9) * 3 + 5 * 9) + ((6 + 2 + 3) + 6 + 7 + 7) * 6 * 6 * 4
6 + 5 + (9 + 9 + 5 * (2 + 3 * 4 + 2) * 9)
(9 + 4) * 7 * (9 * 7 + 5 * 4 + 4 + 5) + 8
4 * 2 * 4
9 + ((4 * 6 + 9) + (8 * 3 + 6 * 5) + 3 + 4 * 8) * 8 * (2 + 6 * 3 * 2)
9 + 9 * 3 + ((9 * 7 * 6 + 8) + 9 * 4 + 6) * 5
(3 * 2 * 8 + 7 + 7) * 8 * 4
(9 + 2 * 4 * 7) * 8 * (8 * 4 * 4 + 5) + 4 + ((9 * 8 * 5 + 6 + 8) * 5 * (4 * 9 * 8) * 7) * 2
(9 + 6 + 7 * 6 + 9 * 4) + 4 * (4 * (6 * 5 + 8 * 9 + 2) * 4 + (3 * 8 + 8) + 3 + 6) * 6
9 * 9 * (4 + 9 * (2 + 7) * (5 + 3 + 5) + (6 * 4))
(9 + 6 * (2 + 3 + 2) * 8 + 3) * 5 * 6 + 7 + 9 * 2
3 + 4 * (2 + 4 + 6 + 2 * 7 + 4) + 5
7 + ((8 + 3 * 9) + 7 + 7 + 5) * (4 * (6 * 3 * 4 * 4 + 9 * 8) * 7 + 2 + 2) + ((6 + 8 * 5 + 2) + 4 + 2)
(3 * (8 * 2)) + 8 * 5 * (5 + 4 * 4 + 8 * 8 * 8) * 2
7 + 8 * 8 * (7 + 7 * (8 * 7 + 2 + 6 + 6 + 5) + 3 * 2)
9 * 9 * 4 * ((4 * 6 + 7 + 9 * 4 + 2) * 5 + 7 + 3 * 3 + 8) * ((4 + 6) + 4 + (4 * 5 * 7 + 4 + 2) + 2)
3 * 2 * 9 + ((8 * 7 * 6 * 3) * 6 * 9 + 3 + 2 + 8)
(3 * 7 + 6 + 7 * 3 + 7) + (9 + 4) + (8 * 3 * 8 + 5) * 2 + 8
3 + 7 + ((9 * 6 * 9 + 7) + 3 + 2 * 4 * (2 * 2)) + 7
9 + 3 * (5 * 4 + 2 + (9 * 2 * 3 * 6) * 6 * 7) * 7
((5 * 2 + 8 * 5 + 2) + 8) * (5 * 3)
(5 + 8 + 3) * (8 + 7 * 8 + (7 + 9 + 2 * 5 + 3))
(6 * (8 * 6 * 2 * 9) * 8 + 5 + 7 * 6) * 3 + 9 * 2 + 3 * 9
4 * 4 + 7 * 4 * (5 + 8) * 3
2 + 7 + (5 * 9 * 2 * 7 + 4)
6 * ((8 + 7) + (6 + 3 * 2 * 9 + 4) * 2 + 8 + 5 + 5)
5 * (2 + 4 * 8 + 3 + 3 + 5) * 4
9 * 2 + 3 * 9 * (8 + (4 * 8 * 2 * 7 + 3) * (9 + 4 * 9 + 3 * 8 + 7)) + 3
3 + 7 + 7 * 6 * 8 + 3
2 + 6 * (6 * 3 + 3 + (9 * 2 + 2)) * 4
((4 + 4 * 4 + 4) + 2 * 9 * 2) + 4 * 9
((7 * 4 + 5) * 8 + 7 + (4 * 6 + 8 + 5 * 6 * 6) + (5 + 3 * 7)) + (2 * (2 + 6) + 4 + 9 + 4 * 3)
6 * (3 + 5 + 9) * ((4 + 9) + 5) + 3 * 6 + 9
(7 * 2 * (6 * 8 * 9 * 3 * 9)) * 2
5 + (5 * (6 + 7 + 5 * 4)) + 9 + (9 + 9 + 6 + 5 + 4) + 8
((9 * 3 + 8 + 3 + 8 + 5) * 8 + 4 + 3) * 2 * 9 + 2
5 * ((5 + 3 + 9 * 6 + 9) * (3 * 6 * 6 * 2) + 6 * 3 * 9 * 3)
(4 * 4 * 7 * 2 + 2 * 7) * 5 * 5 + 7
3 + (7 * (8 + 6 * 5 * 3)) + 9
5 + ((5 + 6) * (9 * 3)) + 5 * 6 + 8 * 6
2 * 6 * (8 * 8 + 5 * (9 + 6 + 3 * 6 + 9) * 3 + 4) * (4 + 4 * 4 * (8 + 5) + 7 + 6) + 5
((7 + 3 * 6) + 6 + (7 * 8 + 4 + 2 + 2 + 2)) + 7 * (4 + 2 + 2) + ((6 + 2) * 6) * 6 + 9
(6 + 2 + 9 * 7) * 7 * 4 + 8
2 + 2 * ((4 + 4 * 8) * 5) * 3 + 8 * ((9 + 8) + 8 * 6)
(6 * 8 * 6 + 2 + (4 * 6 + 4 * 7 + 7) * 2) * 7 * ((5 + 9 + 5) * 8 * 3)
8 + (3 + 5 * 9 * 6 + 3)
2 * 6 + 8 + (2 + (4 + 8 * 5 * 4) + 9) * (7 * (8 * 9 + 9 + 3)) * 8
(3 + (7 * 4 + 7) + 7) + 9 + 3 * (8 * (6 * 3) + 4) + 9 * 2
(4 + 5 * (2 + 6 + 5) * 4) * 9 + 9 + 3
9 + (4 * 7 * 6 * 9 + 8 + 3) * (6 * 4 + 4)
(3 * (2 * 4) * (3 * 7 + 4 * 4) + 2 + 3) * 3 + 3 * 8
7 * (8 + 5 * (3 * 6) + 5 + (2 + 4 * 6 * 7 * 6))
(5 + 7 + 6 * 6) * 8 + 2 * 4 + (2 + (2 + 3 * 5 * 2 + 5) * 7 + 4 * 4)
(3 + 2 + 2 * 4 + (8 + 6)) + 2 + 9 + 3 + 6 + 7
9 + 2 + (7 + 6)
(7 * (6 * 4 * 9 * 4 + 2 + 9) * 5 + 7 + 9) * 3 + 5 + 3 * 7
((3 + 5 * 5) + 4 + (7 * 7)) + (2 + 8 + 7 + 6 + 5 + (7 + 7 + 6 + 4 + 6)) + 8 + 7 + (5 + (5 * 7 * 9 * 4) * 2 + 7)
(5 * 3 + 4) * 4 + 3 + ((3 * 3 * 3 + 5) * 7) * 8 + 7
7 + (2 + 3 * (8 + 4)) * ((2 + 5) + 6 + 6) + 9 + 7
6 + 6 + 3 + 3
7 + 9 + 6 * ((6 * 7 + 2) + (6 * 4 * 4 + 4) * 9) * 3 * (5 * 2 * 8 * 9)
(6 * (2 + 4 * 9 + 3 + 9 * 4) * 5 + 6 + 8 * 7) * 5 * 5 * (9 * 8)
8 + 2 + (4 + 3 * (8 * 6 + 5 + 8)) + 5 + 2
6 * ((9 * 3 + 8 * 8 + 2 * 5) * 8 + 7) * 7 * 5 + 6
2 + 3 + 5 * 5 + ((3 * 7 * 6 * 8 * 3) + 9 * 9) + 2
7 + 2 * 2 + (5 * (8 + 5 * 2) * (3 * 9 + 7 * 7 * 2) * 7 + 8 * 2) + 4
5 * 6 * (7 + 2 * 8)
9 * 4 + ((2 + 3 + 2 + 2 * 8) + 7) * (2 * 9 + 2 + 6)
((5 + 5 + 8) + 8 + 8 + 9 * 7 * 8) * (8 + 5 + 9 + 4) + 5 + 7 + 8 * 3
(3 * 6 + (3 * 8 + 5 + 4 + 6) + (6 * 4 + 6 * 8 * 4) + 7) * (5 * (3 * 7 + 5 + 5 + 2)) * 5 * 6
5 + 6 * 5 * 8 + 2 * (7 + 2 * 9)
4 * 4 + 4 + 3 + 2 + 3
((2 * 4) + 5 * 6 + 2 + 3 + 2) + 4 * 8
5 + (5 + (6 * 3 + 3 * 6) + 7 + 9 * 9) * 9 * 7 + 4
9 + ((8 * 7) + 3 * 5) * 7
4 + (9 + 3 * 7) * 8 * 3
6 + (8 + 9 * 5 + 2) * 3 + (3 * 7)
(8 * 6 * 9) + 9 * 7 * 6 + 2 * (4 + 4 + (2 * 3 + 3 * 4 * 8) + (8 * 5))
(3 + 7) + 8 * 7 * (9 + (8 + 5 + 9) + 3) * 4 * 4
((8 * 5 + 5 + 5 * 3 + 5) + 7 * (3 + 2 * 2 * 3 + 7 * 3) * 2) * 5 + 3 + 3
8 + 3 * 6 + (9 * 7 + 4 * (3 + 3 + 9)) + 3
8 * (8 + 4 + 5 + (9 * 3)) * 5 + 7 + 3 + 7
4 * ((4 * 5 * 4) + 4) * 8 * (2 + 2 + 4 + 7 + 2 + 2)
9 * (6 * 9 + 2 + (7 + 7 + 5 + 4) + 2 + 2) + 5 * ((4 * 3) + (2 * 2) * 6) + 9
8 + (9 * (8 + 6 * 7 * 7 + 3) + 7 * 2 + 5) * 4
5 + (8 + (5 * 3 + 6 + 6 * 3)) * 6 + 4 + ((5 * 3 * 2) + 6 * (4 * 3 + 6) + (4 + 5 * 8) + 9 + 2) * 9
4 * (3 + (9 * 5 * 2 + 2) * 6 + 6 * 4 + 7) * 3 + 3 * (2 * 8 * 5 * 3 + (6 * 7 * 4 + 4))
4 + 6
(2 + 3 + 9) + (9 * 4) * 7 + (2 * 6 * 8 + 3 * (6 + 7)) + 7 + 5
4 + ((9 * 5 + 9) * 6) + 5 * 8 + 6 * 5
2 + (8 * 6 + (6 + 5 * 8) + 3 + 7 + 9) + 6 * (4 * 2 * 5)
(4 * 3 + 5 * 2 + (4 * 4 * 4 + 3 * 2) + (4 + 3 + 9 * 5 + 5)) + 5 * 3 + 2 * (9 * 2 * 5 + 6)
6 * 6 + (3 + (8 * 4 + 8 + 7))
4 + (5 + 4 + 8 * 8) + 6 + 2 + 7 * 5
5 + (6 * 2) * 7 + 5 * 5
2 + 3 + (5 * 4) * 4 + 8 * (5 * 8 * 9 + 8 + 4)
(5 * 3 * 4 * 9 * 3 + 6) + 5 * (9 * 4 + 4)
8 * 7
4 * 2 + 6 + 9 + 6 * (2 * (7 * 9 * 7 + 3 * 9 * 8) * 4 * 4 + 6 + 3)
(3 + 5 * 2) * (8 + 2 + 2 * 7 + 2 * 6) + 9
2 * (4 + 2 + 5 + (4 + 3 * 6 * 7 * 7) + (9 + 7 + 5 + 6)) + (3 * 9)
(3 * 7 + 5 * 7) * ((4 + 2 + 9 + 3 + 3 * 3) + 6 * 7 + (4 * 3 + 8)) + 7 * 9
9 + 9 + 6
((9 + 4 * 4 * 4) * 6 + 2 * 9 * 4 * 9) * 3 + 3 * 8 + 4
7 * 7 + 8 * 3 + 5 * (3 * 7)
((5 * 9) * 3 + 8 * 6 * 4 + 3) + (6 + 7 * 4 + 8) + 8
7 * (5 * 4 * 3 * (2 * 5 * 2) + 6)
9 + 5 * (7 + 8 * 4) * 3 + 2 + (2 + 3 + (8 + 4 + 4 * 5 * 8 + 6) + (4 * 8 + 9 * 4 * 9 * 5))
((9 * 9) + 2 * 8 + 9 + (4 + 9 * 8) + (6 * 3 + 9 * 6)) + (3 * 9 + 8 + 8 * 9) + 5 * 8
((2 * 2 + 5) * (2 + 6 * 5 + 8)) * 5 + 3 * 4
8 + (9 * (7 * 5 * 3 * 2 + 9) + 9) * 6
(6 + (9 * 4 * 7 + 2 + 9) * 7 + 6) + (2 * 4 + 5 + (5 + 8) * 3 + (8 * 9 + 2 * 4 * 4 + 5)) + 2 + 4
3 + 5 * 8
5 + 9 * 4 * 7 + 5 + (9 * 5 * 2 + 8 * 3)
3 * (7 + 6 * (8 + 6) + (9 + 3 * 3)) * 6 + 4 * 3 * 3
(9 * 5 + 2 * 8 + 4) * (8 + (5 * 5 * 6 + 2 + 2)) * 6 * 6 + (5 * 3 + 3) + ((2 * 7 + 7 * 7 + 7 + 3) * 4 + 5 * 3 * 3)
(5 + 5 * 4 + 7 * 8) * (9 * 9 * (4 + 4 * 2 * 5 * 2)) * 8 * 7 + 8 * 9
3 * 5 + 5 * (2 * 3 + 7)
(7 * 5) * 8 * 4 * 5
6 * 3 * 5 * ((4 + 4 * 9 + 2 * 3) * 5) + (7 * 3 * 5 + (8 * 7 + 7 * 6) + 4) * 2
7 + (6 * (5 + 6 * 7)) * 9 * 8 + 3 + 7
6 * 3 * (8 * 8 * 7 * 8 * 2 * 8) * (6 + 5 + (2 + 9 * 6) + 5 * 3) + 6
2 * 9 + 8 + (9 + 9 + 9 * 9 * 3)
((2 + 7) + 2 + 2 * (8 * 2 * 5 * 2)) + 8 + 2 * 3 + 9
8 + 7 + (2 * 5) + 9 * (5 + 4 + 8 + 4) * 3
6 * 9 * 6 + 4 + (5 * 4 * 7 * 9 * (8 + 9 * 3 + 8 + 4) * 6) * 4
8 * (3 * 4 * 3) * (2 * 2 * 8 * 5) + 8 * 4
2 * 7 * ((2 + 2 * 6 * 2) + 3 * 8 * (8 + 6 * 4 + 8 + 2) + 7)
7 + (4 * (5 * 8 * 5)) + 7
5 + (6 + 8)
2 * 4 + (3 * 6 + 8 + 2) * (7 + 3 + 6 + 8)
9 * 3 * 4 + 8 + 3 + (7 + 9 + 9 * 8 + 3 + (8 + 5 + 2 + 9))
6 + (3 + 9 + 8 + 6 * 8 * 7) + 6 * 8
8 + 3 + ((2 + 3) * 8 * 5 + 8 * (2 * 9 * 8 + 5 * 2) + 2)
(8 + 3 + (9 + 9 * 4 * 4) + (3 + 8 * 3 * 4 + 2) * 8) + (5 * 4 + 7 * 3 + (3 + 2 + 2)) + 8 * 5
(8 + 8 * 6 * 3 + (5 + 7)) * 2 * (4 + 3 * 5 * 2 * 9)
(7 + 8 * (6 * 5 + 3 + 2 + 3 * 2) * 7 * 7 * 2) + 4 * 3 * ((3 * 3 * 8 + 8 + 5 * 6) + 5)
3 * 5 + (6 + 7 + 7 + 5) + 2
((2 + 8 * 7 * 5) * (8 + 6 * 5 + 7 * 7 + 3) + (2 * 6) + (9 + 5 + 2 * 7)) * 4 * 5 * 7
7 * 2 * 5 * (8 * 6 * 3) * (5 + (7 * 8 * 3))
(8 + 2 * 5 * 9) + 6 * (7 * 8) + 5 * 9
8 + (5 + (9 * 8) * (7 + 7 * 4 + 7) + 5 + 2) + ((4 + 7 * 3) + (6 + 6 * 8 * 5 + 3) * 6 * (9 * 6 * 6) * 8 * 8) * 3
(7 * 7 + 7) * 3 + 4 * 6
(3 * 2 * (3 + 9 * 3 * 9 * 9) * 6 + 3) * 4 * (8 + 9 + 3 + 6 + 4 * 5)
(7 + 7 * 6) + 6 + 9 * (5 * 4 * 5 * 7 * (4 * 2 * 3 + 8) + 3) + (9 + 8) * 8
4 + (8 + 3 * 3) * ((5 * 7) + 9 + 4) * 2 + 8 + 3
(8 * (6 * 8 + 3 * 3 + 3 + 6) + 5 * (2 * 5 * 5 * 5 + 9 * 8) * 7 + 6) * 7 + 3 * (2 + (6 * 2 + 4 * 2 * 6) * 8) * 3 * 7
3 + 4 + (5 + 3 * (3 + 3 * 6) * 8 * 8 * 9) * 3
(4 + 8) + 7 + 6 * 2 * (8 * 7 * (7 + 7 * 3))
3 * ((7 + 8 + 8 * 7) * 5 * 3 + 8 * 2) * 5 + 2
9 + 2 * 6 * (5 + 8 * (8 * 4 * 7 + 6 + 3 * 8) + 7) + 4 * 3
2 + 6 * 4 * 6 * (3 + 5 * (2 + 4 + 9 * 8 + 6))
3 + (7 + 9 * (3 + 4 * 7 + 2 + 7 * 5)) * (9 + (2 + 9 * 8)) * (7 * 4 + 7 * 4 + (7 + 2 * 5 + 5 * 2))
(7 + 7 * 5 + (3 + 3 * 4)) + 2 + 4 + 8 + 3
2 * (9 + 7 + (6 * 2 + 9)) * (2 * 5 * 3 * 8 * 2 + (3 * 3 * 6))
8 * (8 + 8 + 7 * (7 + 3)) + 4
4 + 9 + 5 * 3
9 * (7 * 7 * (6 + 9 * 7 + 9 * 4) * 9) + 2
(2 * 4 + (8 * 8 * 5) + 4) + 3 + 3 * 3 + 2 + 8
5 + (4 + 7 + (3 * 9) * (5 + 6 * 5 + 4 + 5) * 9) + 6 * 3 * 2 + 7
7 + (7 * 9 * 7 + (8 * 4 + 7 + 7 + 2) * (4 + 5 + 7 + 6 + 6) + 9) * 5 + 5 + 2 + 3
((6 + 7 + 8 + 6 + 7) + 8 * 4 + 8 + 8) * (4 * 6) + 7 * 6`;


/***/ }),

/***/ "F6Yz":
/*!****************************************!*\
  !*** ./src/app/solution-code/day03.ts ***!
  \****************************************/
/*! exports provided: dayThreePartTwo, dayThreeInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayThreePartTwo", function() { return dayThreePartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayThreeInput", function() { return dayThreeInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayThreePartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const lines = fileReader.readLineByLine();
    const maxLine = lines.reduce((prev, line) => Math.max(prev, line.length), 0);
    const TREE = '#';
    function traverse(leftStep, downStep) {
        let currentPos = 0;
        let treesEncountered = 0;
        for (let i = 0; i < lines.length; i += downStep) {
            if (lines[i][currentPos] === TREE)
                treesEncountered++;
            currentPos = (currentPos + leftStep) % maxLine;
        }
        console.log(leftStep, '/', downStep, ':', treesEncountered);
        return treesEncountered;
    }
    const multiplied = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ].reduce((prev, [left, down]) => traverse(left, down) * prev, 1);
    return multiplied;
}
const dayThreeInput = `.#.......#...........#.........
..##.......#.#.#.....##...#....
.......#..#.....#...#..........
...#..........###...#........##
#.#..#.#.##.#........#.#.....#.
#..#....#..#....#..............
#..#........#..................
..#.#...#.#...#....#.#.#..#....
..............#..#.............
.##....#...................#...
........#..........#......#...#
.##..#..#...##..........#...#..
.#...#....#.........#...#.....#
.#........##............#.#....
...........#..............##...
.#..#......#..#..............#.
..#.#.#...........#........#...
..###..........#....#.#......#.
.......#...##..........#.......
........#...#..................
....#....#..#.......#........#.
.......##.#......#.....#...##..
..#.#........................#.
.#.....#.##..............#.#...
..#.#...#.#..#....#....#.......
.#....##.....#....#........#...
..#...........#.##....#...#....
..#.##...#....#.#.....##...#...
.......#...####...#...#.......#
.#...#.........................
.......................#.......
.....#.#.........#..........#.#
#.........#............###..#..
.....#.#.............###.......
...#..#........#.#.......#.....
...................#....#......
...#..#...#............#..##...
...#.....#....#.......##......#
.....#....#...##..#..#...#...#.
..........#...........#.#.#....
..#.......#...#.....#......#...
.........#.......##......#..#.#
..#.....#..#.###...#.#......#..
#....#...#..#...#.....#........
..#......#..#.......#.#.....#..
#......#...#......#.....##.#...
........##.......#.......#.....
.#.#...............#...........
..............#...#.#....#.....
....#......#.#..#......#.......
...##....#....#...#............
.#...............#...........#.
.#.#...#.#.....#.....#...#.#...
...##...........#.....#..#...#.
.#.#...##.#.#......#......#....
.##.....#.......##....#.#.#....
.......#...........#....#....#.
....#...........#......#.####..
......#....#...#...##.......#..
......................#.#####..
..#...#.#...#..#..#......#.....
....#........##.......##....#..
#.#......##.........##.#..#...#
.#.#....#...#..#...#...##....#.
.....##...#....#....#.#........
......#..#....#.#...#..........
.........#...................#.
............#.###....#.#.......
...#.#.....#......#....#.#..#..
..............#..#.#.#.#.......
#..##...................##.....
..#.......#..#.........##..#...
.........##...#......#........#
..#.........#........##.###.#..
...........#.#....#.....###....
..#....##.#..#.##....#.....##..
..#.....#.##..................#
#....#.........................
..............#..#...#.#.......
......#..#.#.##....#..........#
..#.........#.####.....#.......
......#..#.#..........#...#....
......#.................#..#.#.
.....#..........#..............
....#.....#............#....##.
.....#.....#........#..........
............#.....#...#........
........#....#.#...............
#.....#.........#......#..#.#..
...#..#......#......#.......#..
.....#......#.#....#..#...#...#
......................#..##....
.............#.........###....#
#..............#.#..........##.
...#.#.................##......
...........#.#.....#...........
.........#.................#.#.
........#........#...#..##...#.
........#......##.......###....
..............#.#.#............
.#.....###...##.#......#.....#.
.............#......#.#.#...#.#
..#.........#.......#.....#....
......#........#...##......#...
.##..........##......#.#.....#.
..#.##....#....#...............
......#...#..#.....#.....#...#.
.......##..##..#............##.
..............#...##........#..
#....#................#..#.....
........#.......#.#.#...#......
......#.......#..............#.
#.#..#...#........#....#..####.
..#........#...........#.....#.
.##...........................#
.............#...........#.....
.#.....#.#...#.........#.......
..........#...#....#....#......
.#..#........##....#...........
.......###......##...#.........
..........#.#.#..#.#....#......
........##..#.........#....#...
........#.#......#.#...#.#..#..
....#....................#.##..
##....#..#...........#.....#.#.
...#..............##...##..#.#.
......#.##.#.......#..#...#....
....#..#..##.....#.....#.#....#
.......#....##.##..............
#..##....#.....#.#.............
..................#......#..#..
..#......#...#..#.......#...#..
...........#....#.#.....#......
#..#...##.........###..#......#
.......#......................#
#.......#....................#.
..#..#..........#..#..#....#...
.##..#..#.....#.#..##..........
#..###.......#..##..#...#..#.#.
.....##......###.....#.#.##...#
..............#...#....#.#.....
#...........#..................
..............#....#..##..#..#.
.........#.............#.......
.#.#....#....#...............##
.##.##.#.....###.....#.........
....#..............##......#...
....#........##................
....#.....#....#....##....##...
.#........#......#......#......
....#..........#...............
##..........#......#.....#.....
........#.#..#.#..#.....##.....
..##......#.#.......#.#..#.....
.#.......#......#...........#..
..#.#..#.#..................#..
...#...#...#...##......#.......
.#...##....#...#...#...#.......
.......#.#.......#.............
.#.##.#.....#...........#.##.#.
.#.##.#........#...##..........
.#.....#.....#....#..#.........
...##.............##...........
.#........##.....#.......#...#.
...........#..#..##........##..
.....#..#......................
..#.......#....................
.....#......#....#....#.......#
........#..#.#.....#......#....
..........#..#.....#......#....
..........#####.....#........#.
........#..#...#.#....#......#.
.........#...#....#.#..........
......#....##..........#...#...
#..............###.#.#.........
.#.#............##......#.#..#.
......#........................
...#..#......#.......#....#...#
.......#....##.....#.#......##.
...........#..........#..#.....
...........#..#.....###......#.
.......#....#..##......#.......
.........#.#.#.......#..#...#..
.......#.......##.....##...#...
..............#....#.....#.....
...#....#.....#.#..........##..
###.........#.............#....
...##......#.#........#....#..#
#....###.......#...#.#......##.
....#...##.......#......#.....#
.....#......#..................
#........##....#....#.#........
........#.......###...#........
........#..#.......###.........
..............#......#..#......
#......#.....#....#.#..........
.#......##.#.#.....#...#.#....#
.##...........#..#.##.....#....
.....#.....................#...
.#..#...#...##.#...#...........
.......#.......##..#.#..#......
.......##.....#.....#..........
.................#.............
#........#..#.......##.........
#...#..###.#..#....#.#.###.....
..#.......#.......#.......#....
..............#............##..
.#...#..#...##.........#....#..
#...........#...#..............
.......#.....#......#..#.....#.
..........#......#.............
##.........###..##.#....#..#.#.
..............###..............
#..##.............##.....#.....
....##...................#..#..
....#.....#..............#..#.#
........#........##...#.....##.
#...........#.##..........##...
#......##.....#...............#
..##..#....#.................#.
#.......##.....................
...............#.##..##......#.
..#.##..#.#....#.......##......
......##....#............##....
.#..#..##.....#.##....#........
#.........#..........#...#....#
...#.......#.............#.#.#.
..##............#...##........#
.......#.#.#........#..........
.....#.............#.....#.....
.........#.........#.........#.
#.....#....#.......#...........
.........#....#.............#.#
.##..#.......#...#......#......
....#....#....#........#....#..
............#.......#..#......#
.#............#.##........##...
..#...##...#....#...#.#...#..#.
#...#..........#..##.........#.
..#.........................#.#
...........#.........#..#.##...
.#..................#..#.......
......#......#...........#..#..
...##.....#.....#..#.......#...
.........#.#.......#......#....
...........#................#..
.....#...#..#............##....
.#.......#..#....#..........#..
#.....#..#.....#..##.......##..
...#.......#...#....#...#.#..##
...#...##......#....#....#.....
.......###.#..#.......#......#.
........#.#...#..#..#...#....#.
....#.........##.#.....#.......
....#.........#..##........#...
..#...........#......#....#.##.
.....................#.........
...................##......#..#
......#.#.....##..##..........#
..#.##........#.#.#..........#.
.#.......#...##.#....#....#....
#.#......#..#..#.......#.......
.............#........#.......#
....#...#.....#........#...#...
..#..............##..#.........
..#.................#..#...##..
....#..#...#...................
......#.........##.#..#..#...##
........#..#....#.......#.#.##.
.#...#...........#..........#..
##.....#...#............##...#.
.##.....#...#..................
.#.......####.#..##.##.#......#
.............#...#..#..#.......
...#.##.........#.#....#.......
...........##...##....#....##..
........#......#...#...........
...........#..#...#....#.##....
..##....#..........#....#...#..
#....#.#.#.......#.#...........
......#............##..........
#.#.###..#....#.......#...#....
.#......##..#..#.#.........#..#
..#.........#........#....#....
......##.#.......##....#..#..##
.............#...#............#
......#......#...#.#.#.##.#....
#.#...#.##.....#..............#
..........#.............##.##..
#......#....#...#.#.#.#..#....#
........#........#...#.#......#
.....#...........#.............
...........#....#..........#...
....####...#..##....#.#........
.#......#...#..#...........#...
#......###..#.##.###...........
..#...........#.........#....#.
................#.#....#..#.##.
...................#......#....
....#.#.....#.......#...###.##.
.#........#.#....#...#..#...#..
....#..###.................#..#
.....#.#..#........#......#..#.
....#.....#...............#...#
............##.#.........#..#..
.......#..#..##.#.#...##.......
..#..........##..#..#........#.
..............#..#...#.........
......#.#....#........##.......
.#.....##....#..#...#.......##.
..............#.##.............
#..#..#...##....##.#.....##.#..
..#...###..#.........##........
........##......#.....#..###...
.....#......##.###.............
....#.....#.#..#.#..#..........
....#..#.......#...........#...
.#.............#..#......##....
..#.#......#.#.................
.......#.#.#............#..#...
......###....##............#..#
.........#....#......#.........
..........#...............#..#.`;


/***/ }),

/***/ "ID08":
/*!****************************************!*\
  !*** ./src/app/solution-code/day04.ts ***!
  \****************************************/
/*! exports provided: dayFourPartTwo, dayFourInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFourPartTwo", function() { return dayFourPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayFourInput", function() { return dayFourInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayFourPartTwo(input) {
    const keyValueRegex = /(.*):(.*)/;
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const asRecords = fileReader.readEntriesSeperatedByWhiteline((lines) => {
        return lines
            .reduce((prev, next) => [...prev, ...next.split(' ')], [])
            .reduce((prev, next) => {
            const match = next.match(keyValueRegex);
            if (!match)
                throw new Error(`Didn't find a match for ${next}`);
            prev[match[1]] = match[2];
            return prev;
        }, {});
    });
    const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    const requiredFields = {
        byr: (value) => value >= '1920' && value <= '2002',
        iyr: (value) => value >= '2010' && value <= '2020',
        eyr: (value) => value >= '2020' && value <= '2030',
        hgt: (value) => {
            const match = value.match(/^(\d+)(cm|in)/);
            if (match) {
                const num = Number(match[1]);
                return match[2] === 'cm'
                    ? num >= 150 && num <= 193
                    : num >= 59 && num <= 76;
            }
            return false;
        },
        hcl: (value) => value.match(/^#[a-z0-9]{6}$/i) !== null,
        ecl: (value) => eyeColors.includes(value),
        pid: (value) => value.match(/^\d{9}$/) !== null,
    };
    const requiredFieldEntries = Object.entries(requiredFields);
    const validPasswords = asRecords.reduce((prev, next) => {
        if (requiredFieldEntries.every(([key, checkFN]) => key in next && checkFN(next[key]))) {
            return prev + 1;
        }
        return prev;
    }, 0);
    return validPasswords;
}
const dayFourInput = `ecl:grn
cid:315 iyr:2012 hgt:192cm eyr:2023 pid:873355140 byr:1925 hcl:#cb2c03

byr:2027 hcl:ec0cfd ecl:blu cid:120
eyr:1937 pid:106018766 iyr:2010 hgt:154cm

byr:1965 eyr:2028 hgt:157cm
cid:236 iyr:2018 ecl:brn
hcl:#cfa07d pid:584111467

eyr:2029 ecl:hzl
iyr:1972 byr:1966
pid:2898897192
hgt:59cm hcl:z

pid:231652013 hcl:#602927 hgt:166
ecl:grn eyr:2025
byr:2008 iyr:1986

byr:1928 hgt:167cm
hcl:#18171d iyr:2012
ecl:oth pid:237657808 eyr:1944

hgt:73in ecl:grn byr:1931 pid:358388825 iyr:2020
hcl:#602927 eyr:2020

hcl:#efcc98 eyr:2024 ecl:hzl
byr:2030 hgt:192cm
iyr:2013 pid:7479289410

pid:053467220 iyr:2012 hgt:169cm
cid:149 hcl:#866857
eyr:2030
byr:1995 ecl:oth

hgt:162cm hcl:#efcc98 ecl:grn byr:1985 pid:419840766
eyr:2022
iyr:2020

pid:22086957 hcl:c69235 ecl:#c458c5 eyr:1986 byr:2014 hgt:72cm iyr:1934

hcl:#866857
ecl:brn eyr:2024
iyr:2017
pid:505225484 cid:144
byr:1980
hgt:170cm

hcl:#866857 ecl:gry
byr:1972 iyr:2019 eyr:2023
cid:234 pid:721290041 hgt:191cm

pid:346301363
eyr:2020
hcl:#733820 iyr:2019 hgt:177cm
byr:1998

hgt:157cm byr:1963
pid:898055805
hcl:#fffffd ecl:blu iyr:2017 cid:87
eyr:2030

pid:605900764 iyr:2011
hgt:73in ecl:hzl eyr:2024
hcl:#888785
cid:281

iyr:2010 eyr:2026 hcl:#4f7e76 pid:883386029 byr:1946 ecl:brn

hcl:z
iyr:2020 pid:9121928466 byr:2014 ecl:zzz eyr:2025
hgt:172in

hgt:151cm cid:163 pid:670884417 iyr:2012
ecl:oth hcl:#ceb3a1
eyr:2028

hcl:z cid:92 hgt:69cm
byr:2008 pid:492284612
eyr:2020 iyr:2023
ecl:hzl

byr:1933
hcl:#7d3b0c eyr:2020 hgt:170cm
pid:949064511 iyr:2010
ecl:oth

eyr:2025 byr:1989 ecl:oth cid:100 hgt:182cm
pid:629190040 iyr:2017 hcl:#b6652a

ecl:hzl cid:76 hcl:#e71392 eyr:2021 iyr:2013 byr:1995
pid:762177473
hgt:179cm

pid:198500564 eyr:2029 hcl:#733820 cid:51 iyr:2012
hgt:70in byr:1938 ecl:oth

hgt:190cm ecl:brn byr:1952 iyr:2015 hcl:#623a2f
eyr:2023

hgt:169cm hcl:#602927 byr:2001 pid:823979592 iyr:2016 eyr:2029

iyr:2010 ecl:gry
eyr:2022 hgt:156cm byr:1953 pid:434063393
hcl:#733820

pid:091724580 hcl:a7069e eyr:1984 ecl:#95d01e byr:2012 iyr:2005

eyr:2022 byr:1972 hcl:#866857 ecl:hzl pid:227453248
hgt:153cm cid:324 iyr:2018

cid:195 pid:049871343
eyr:2024 hgt:169cm
byr:1952 iyr:2010 ecl:grn

eyr:2035 pid:189cm
hgt:77 iyr:1973 ecl:#dc83d5
hcl:z byr:2004

byr:2027
pid:89338932 hcl:1de39e ecl:grn hgt:159in eyr:2034 iyr:1937

pid:076534920
hgt:152cm
byr:1969
ecl:blu
hcl:#866857 iyr:2011 eyr:2024

iyr:2019 eyr:2028
ecl:blu hgt:169cm
hcl:#888785 pid:332202163 byr:1923

hgt:65in byr:1964 iyr:2019
pid:287612987 ecl:hzl cid:213 eyr:2023 hcl:#ceb3a1

hcl:#623a2f pid:182484027
iyr:2016 ecl:brn byr:1943
hgt:71in eyr:2021 cid:344

hcl:#cdee64 iyr:2011 ecl:brn eyr:2026 hgt:176cm
byr:1985 pid:978641227

eyr:2029 ecl:brn hgt:173cm byr:1920 cid:211
hcl:#866857
iyr:2016 pid:289769625

hcl:#7d3b0c pid:770938833 iyr:2010 byr:1941 ecl:oth eyr:2029 hgt:161cm

hgt:172cm iyr:2015 ecl:gry byr:1948
eyr:2029
pid:466359109 hcl:#341e13

cid:74 pid:405199325 ecl:blu
hcl:#6b5442
eyr:1980 byr:2024 hgt:174cm iyr:2011

hgt:183cm pid:075760048 cid:78 byr:1960 ecl:hzl eyr:2030 hcl:#6b5442 iyr:2014

cid:264 hcl:#7d3b0c
ecl:blu iyr:2011 eyr:2020 hgt:182cm
byr:1929

pid:435338286 byr:1931
hcl:z ecl:amb iyr:2013 hgt:73in
cid:165 eyr:2027

pid:511898552 eyr:2025 hgt:184cm hcl:#602927
iyr:2018 byr:1989 ecl:hzl

iyr:2016
hgt:168in
hcl:#623a2f
eyr:2025 pid:310738569 ecl:#0c3039
byr:2027

pid:158cm byr:1946 ecl:grt
iyr:1920 cid:189
hcl:389bce hgt:165cm

pid:973732906 hcl:#cfa07d iyr:2010 eyr:2020 hgt:180cm
byr:1930
ecl:brn

pid:930994364 byr:1967 hgt:151cm
iyr:2011 eyr:2022

eyr:1968 hgt:75cm cid:241
iyr:2011 pid:5493866745
ecl:grt
byr:1976 hcl:#a97842

eyr:2026 ecl:oth
iyr:2016 hcl:#c0946f
byr:1929
hgt:175cm
pid:9421898537

eyr:2028 iyr:2016 byr:1962
ecl:grn hgt:186cm hcl:#cfa07d pid:432962396

iyr:2010 byr:1934 eyr:2023 hgt:180cm hcl:#cfa07d ecl:gry

cid:168
byr:1978
eyr:2027 hgt:189cm pid:802710287
hcl:#2f980b iyr:2014
ecl:grn

eyr:1970
pid:576329104
ecl:xry iyr:1954 hcl:#341e13 byr:2026
hgt:74in

eyr:2027 hgt:153cm
ecl:oth
hcl:#866857
pid:290407832 byr:1956 iyr:2017

iyr:2011
cid:128
ecl:amb hcl:#7d3b0c hgt:68in pid:743606119 eyr:2020

ecl:oth hcl:#cfa07d
byr:2016 pid:#de98ae iyr:1984 cid:194
hgt:170cm
eyr:2034

pid:526098672 hgt:168cm
hcl:#7d3b0c cid:167 byr:1923 ecl:blu iyr:2016
eyr:2030

pid:495569197 hcl:#866857 hgt:193cm
iyr:2013 eyr:2021 byr:1921 ecl:amb

ecl:amb
hcl:#a97842 pid:862249915 iyr:2012 byr:1964
cid:325
eyr:2021

iyr:1958
byr:2003
hgt:160 hcl:#18171d
ecl:hzl eyr:2020

iyr:2019 byr:1997 ecl:brn
pid:342735713 hcl:#efcc98
hgt:181cm cid:307
eyr:2027

pid:817121616 eyr:2020
iyr:2012
hgt:185cm
hcl:#18171d byr:1969 ecl:hzl

pid:381399203
ecl:oth byr:1930
iyr:2014 hcl:#6b5442 hgt:71in cid:156 eyr:2025

byr:2002 hcl:#18171d iyr:2017
pid:398245854 hgt:64in ecl:gry eyr:2025 cid:127

eyr:2028 hcl:#341e13
ecl:amb iyr:2012
pid:079796480 hgt:69cm
byr:1995

cid:315 iyr:2028
pid:775929239
hgt:162cm ecl:dne byr:1940 eyr:1952 hcl:#c0946f

iyr:2015
hgt:154cm byr:1997
ecl:grn
cid:125 eyr:2024 pid:834780229
hcl:#18171d

ecl:hzl hcl:#a97842 pid:553710574 eyr:2028
hgt:183cm cid:196
iyr:2014

pid:377912488 hgt:159cm ecl:amb eyr:2024 byr:1974
iyr:2014
hcl:#ceb3a1

eyr:2024
byr:1947 hgt:63in ecl:brn
cid:69
pid:185228911 hcl:#b6652a iyr:2016

eyr:2024
hgt:168cm hcl:#602927
iyr:2013
byr:1993
pid:681091728 ecl:gry cid:203

pid:037922164 iyr:2020
byr:1990 hgt:156cm eyr:2023 hcl:#866857
cid:97 ecl:grn

hgt:170cm pid:980455250
iyr:2011 ecl:hzl byr:1957
eyr:2030 hcl:#cfa07d

hgt:158cm
hcl:#602927
byr:2002 ecl:hzl iyr:2013
cid:99
eyr:2020 pid:48646993

byr:1955 pid:814033843 eyr:2030 hcl:#a97842
hgt:191cm iyr:2019

pid:111196491 hgt:191cm iyr:2012 ecl:blu hcl:#a97842
eyr:2026 cid:131 byr:1979

hcl:#fffffd hgt:68in
cid:121 ecl:oth eyr:2024 pid:343836937
byr:1955
iyr:2020

eyr:2025 byr:1954
pid:737517118
cid:343 hcl:#b6652a
iyr:2017 ecl:hzl
hgt:175cm

ecl:brn
iyr:2011 hgt:171cm cid:102 pid:066348279 byr:1981

ecl:oth iyr:2018 byr:1975
eyr:2029
hgt:185cm cid:226
pid:978243407 hcl:#341e13

iyr:2015 pid:918017915 hcl:#3e52b7
byr:1999 ecl:brn cid:314
eyr:2025 hgt:192cm

hcl:#19d1fa byr:1984 ecl:dne hgt:76in
iyr:2015 cid:118 pid:417075672
eyr:2020

iyr:2019
cid:120 hgt:186cm
hcl:#733820 eyr:2024 pid:423238982 ecl:brn byr:1968

hgt:70cm cid:173 pid:767014975
hcl:#866857 eyr:2039 ecl:brn byr:1985

pid:340424924
eyr:2027 hcl:#7d3b0c
hgt:168cm ecl:hzl iyr:2016
byr:1994

ecl:hzl byr:1933 pid:580425691
iyr:2010 hcl:#c0946f eyr:2024
hgt:64in

hcl:#9fe6b0 pid:913184461 ecl:grn eyr:2030
cid:262 iyr:2014

ecl:amb pid:640007768 eyr:2030 byr:2017 iyr:1988 hcl:z

byr:1977 cid:54
eyr:1939 pid:882762394 iyr:2030 hcl:#ceb3a1 ecl:blu

iyr:2011 hcl:#7d3b0c byr:1928
pid:340969354 cid:199 hgt:168cm eyr:2029 ecl:hzl

pid:729464282
iyr:2012 hcl:baae60
eyr:2026 ecl:hzl hgt:166cm byr:2019

pid:930997801 iyr:2019 eyr:2030
hcl:#866857 ecl:oth byr:1960 cid:235 hgt:73in

ecl:brn
byr:1988 hgt:179cm iyr:2017
pid:864768439 cid:305 hcl:#c0946f
eyr:2029

hcl:#7d3b0c ecl:grn
hgt:182cm eyr:2021 pid:719891314
byr:1920 iyr:2017

hgt:62cm
cid:71 ecl:brn hcl:#fffffd iyr:2025 eyr:1997
pid:175cm byr:2022

hcl:#cfa07d cid:239 eyr:2025 ecl:hzl hgt:189in byr:1980 iyr:2020
pid:703047050

byr:1951
eyr:2030
ecl:hzl
pid:130992467 hgt:157cm hcl:#341e13

hgt:175cm
hcl:#623a2f
cid:68 eyr:2025
byr:2001 ecl:oth pid:253618704 iyr:2016

hcl:#fffffd pid:379344553 ecl:grn
eyr:2026
hgt:72in byr:1974 iyr:2013

ecl:#b4e952 byr:1970 hcl:z
eyr:2039 pid:6056894636 iyr:2021 hgt:165cm
cid:328

hcl:#602927 iyr:2014 pid:890429537 byr:1957 hgt:68in eyr:2020 ecl:hzl

cid:265 byr:1961 hcl:#ceb3a1 eyr:2022 iyr:2016 hgt:184cm pid:921615309

byr:1951 eyr:2024
hcl:#341e13
ecl:amb pid:414644982
iyr:2010 hgt:159cm

iyr:2015 cid:319
eyr:2029 ecl:brn pid:380237898
hcl:#efcc98 hgt:157cm byr:1972

pid:237156579 ecl:#312a91
hgt:167cm iyr:2011 hcl:#c0946f eyr:2021 byr:1953

ecl:hzl iyr:2015 pid:10160221 eyr:2025 hgt:175cm hcl:z byr:1939

hgt:59in hcl:#18171d byr:1962 ecl:hzl
iyr:2019 eyr:2025
cid:337 pid:491938615

ecl:utc hgt:82 pid:51674655 byr:2020
eyr:1954 iyr:2029 hcl:z

pid:119530189
cid:103
iyr:2010 byr:1979
hgt:168cm hcl:#a97842 ecl:brn eyr:2029

hgt:177cm ecl:brn
byr:1990
pid:015089628 eyr:2028 hcl:#733820 iyr:2020

ecl:blu iyr:2020 hgt:189cm
hcl:#efcc98 byr:1982 pid:346500376 eyr:2021 cid:160

ecl:brn hgt:173cm iyr:2011 cid:259 hcl:#6b5442 eyr:2026
byr:1995
pid:654875035

ecl:grn eyr:2025 pid:147155222 byr:1942
cid:341 hcl:#602927
hgt:165cm
iyr:2016

pid:543171646
hgt:153cm
iyr:2019 hcl:#fffffd byr:1985 cid:266
eyr:2027
ecl:hzl

ecl:blu
eyr:2022
pid:667939101 byr:1974
cid:259 hcl:#888785

eyr:2030 byr:2016 iyr:2022
pid:86902982
ecl:zzz hgt:72 hcl:ceb867

hcl:#fffffd
ecl:grn pid:046978329
byr:1924
eyr:2025 hgt:158cm iyr:2011

hgt:150cm eyr:2028 byr:1985 ecl:gry hcl:#866857 pid:340615189
iyr:2017
cid:50

cid:171 hcl:#18171d pid:009562218 byr:1981 hgt:175cm eyr:2024 ecl:oth iyr:2017

iyr:2019
eyr:2022
ecl:brn hcl:#cfa07d pid:050270380 cid:159
hgt:151cm
byr:1951

hcl:#7d3b0c hgt:176cm iyr:2015 byr:1923 pid:348188421 ecl:blu eyr:2029

byr:1997 hgt:162cm eyr:2023 pid:445685977
iyr:2012 ecl:amb hcl:#efcc98

iyr:2017 ecl:oth eyr:2028 pid:791977055 hgt:170cm byr:1991
hcl:#623a2f

byr:1998 hcl:#fffffd
eyr:2020
ecl:gry pid:039483695 hgt:163cm iyr:2020
cid:165

ecl:hzl hgt:74in iyr:2016 pid:026214321
cid:152 hcl:#a1f179
eyr:2036 byr:2001

pid:257900949 cid:80 byr:1956 iyr:2012 hgt:165cm eyr:2030

pid:918371363
ecl:xry
iyr:2012
byr:2012 hgt:65cm
eyr:2029

pid:041789006 iyr:2018 byr:1945 eyr:2024 ecl:blu
hcl:#5ab31e hgt:171cm

ecl:gry
byr:1956 cid:318 iyr:2020 hcl:#623a2f
eyr:2030 pid:020576506 hgt:184cm

hgt:173cm iyr:2025
eyr:2023
ecl:amb pid:958983168 hcl:#866857 byr:1935

byr:1974
eyr:2040 pid:57104308 iyr:1980 hcl:z
hgt:192in cid:295 ecl:amb

pid:180cm hcl:1109f7 eyr:2039 byr:2020
ecl:dne hgt:189in iyr:1921

iyr:2013 byr:1961
hcl:#866857
eyr:2025 hgt:158cm ecl:gry

ecl:brn iyr:2013 eyr:2021 pid:978650418 byr:1980
hcl:#ceb3a1 cid:110
hgt:166cm

pid:864880558 ecl:hzl hcl:#c0946f byr:1955 eyr:2027 hgt:169cm iyr:2011

eyr:2023 hgt:191cm hcl:#866857
pid:454509887
ecl:grn byr:1938 iyr:2015

pid:793008846 eyr:2025 ecl:grn hcl:#341e13
hgt:187cm
byr:1973 cid:224
iyr:2013

hcl:#866857 eyr:2022 pid:802335395 hgt:171cm ecl:amb
iyr:2015 byr:1991

hcl:#888785 pid:768625886
hgt:180cm
eyr:2026 ecl:oth cid:178 byr:1958

pid:921387245 cid:82 hgt:190cm hcl:#c0946f ecl:grn
iyr:2015 eyr:2023

pid:0704550258 hcl:1ba8f6 iyr:2010 byr:1978 cid:130
eyr:2030 ecl:dne hgt:66cm

pid:626293279 hcl:#7d3b0c hgt:185cm ecl:oth
eyr:2020 byr:1937 iyr:2012

hgt:175
eyr:1933 ecl:gry
hcl:#7d3b0c byr:2003 pid:#5d8fcc
iyr:2012

eyr:2027
byr:1927 cid:154
ecl:gry pid:683668809 hgt:164cm
hcl:#a97842 iyr:2011

byr:1940 iyr:2014 hgt:172cm eyr:2024 pid:033678324 hcl:#10fded
cid:292 ecl:oth

iyr:1970 ecl:#201515 pid:#4cd485 eyr:2034 hgt:162
byr:2005 cid:67
hcl:#c0946f

cid:306
byr:1948
hcl:#efcc98
eyr:2024 hgt:171cm pid:440657854 iyr:2015 ecl:brn

hgt:172cm ecl:brn byr:1958 pid:054926969 hcl:#4b8065 iyr:2019

pid:45977569 ecl:amb byr:2002 hgt:71cm hcl:z iyr:1983

pid:811407848 hcl:#866857 cid:112 hgt:180cm byr:1986
ecl:brn eyr:2026

ecl:amb
byr:1992
cid:288 pid:417117245 hcl:#623a2f
iyr:2011 hgt:181cm
eyr:2021

byr:1974 hgt:192cm cid:172
eyr:2022
ecl:blu
hcl:#cfa07d iyr:2014

eyr:2024 ecl:gry
pid:874569675 byr:1960 iyr:2017 hgt:186cm
hcl:#6b5442

byr:1988 eyr:2024 iyr:2020 ecl:oth hcl:#866857 pid:227304269 hgt:170cm

ecl:grn iyr:2019 byr:2002 cid:150 hcl:#efcc98
pid:600740993
hgt:167cm eyr:2027

pid:553824537 iyr:2019 ecl:blu eyr:2025 hcl:#e21269 hgt:193cm
byr:1923

byr:2030 iyr:2019 ecl:#cb0911
hcl:#cfa07d hgt:74in eyr:2012
pid:7647207386

cid:289 hgt:128 pid:178cm iyr:2025 ecl:#4ad977 byr:2020 eyr:2036 hcl:#efcc98

cid:119 hgt:150in
hcl:z
iyr:2012
ecl:brn eyr:1975
byr:2007 pid:#0dcd32

hcl:8a1ce7 pid:0434291854
eyr:2034 iyr:2005
hgt:62cm byr:2029 ecl:utc

ecl:gry hcl:#ceb3a1 byr:1976 eyr:2024 iyr:2010 hgt:188cm
pid:636312902

hcl:#888785 byr:2027 hgt:178in iyr:2017 pid:973095872 eyr:1952

hgt:179cm iyr:2015 hcl:#ceb3a1
byr:1944 pid:182079308 cid:317
eyr:2025 ecl:hzl

hcl:#6b5442 ecl:grn eyr:2023 hgt:71in pid:829794667 byr:2000
iyr:2014 cid:192

iyr:2014 pid:096659610 hcl:#c0946f ecl:oth byr:1991 cid:180
hgt:177cm
eyr:2023

byr:2017
eyr:2036 iyr:1933
cid:225 ecl:gmt hgt:179in
hcl:b5c44d pid:99932231

hcl:#18171d
hgt:187cm eyr:2023 byr:1934 cid:286 pid:878541119 iyr:2020 ecl:amb

hgt:185cm
pid:754207134 ecl:oth eyr:2023
hcl:#a97842 cid:313 byr:1966
iyr:2015

hcl:#ceb3a1 byr:1921 eyr:2022 pid:799265846 cid:285
hgt:67in iyr:2015

iyr:2011 byr:1941
hcl:#341e13 cid:65 pid:413556937
hgt:169cm
ecl:amb eyr:2020

iyr:2016
hgt:158cm ecl:grn byr:1931 hcl:#7d3b0c

pid:574299170 iyr:2013 byr:1961 ecl:hzl hcl:#866857 hgt:168cm eyr:2022

eyr:2022 pid:245416405
iyr:2019 hgt:173cm hcl:#c0946f
ecl:brn
byr:1965

byr:1980 hgt:162cm ecl:brn pid:239318191
hcl:#fffffd
cid:58 eyr:2025 iyr:2020

pid:892646915
iyr:2012 hcl:#733820 byr:1991 eyr:2021
hgt:157cm ecl:oth

pid:310597466 eyr:2025
hcl:#cfa07d byr:1944 iyr:2018 ecl:oth
hgt:183cm

iyr:2010 hgt:187cm ecl:oth
pid:975763328
hcl:#866857 eyr:2023 cid:283 byr:1997

iyr:2020 cid:225 hcl:#efcc98 pid:424680047 ecl:blu
hgt:154cm
byr:1968 eyr:2027

ecl:oth eyr:2020 hgt:183cm hcl:#623a2f
pid:771851807
byr:1990
iyr:2017

hcl:#efcc98 ecl:blu byr:1991 hgt:191cm pid:266021118
cid:124
eyr:2025

byr:1993
ecl:hzl eyr:2020
hgt:163cm
iyr:2015 pid:831538073 hcl:#18171d

hgt:74in hcl:#420afb eyr:2028
ecl:grn pid:264469103
byr:1993

eyr:2020
cid:79
byr:1972
pid:084953331 hcl:#a97842 ecl:brn iyr:2010
hgt:170cm

iyr:2014 ecl:gry pid:094812116 eyr:2026 hgt:190cm byr:1965 hcl:#944667

hcl:#fffffd byr:1953 iyr:2014 ecl:hzl hgt:164cm
cid:123 eyr:2023 pid:546394433

iyr:2012 hgt:155cm byr:1998 pid:#2c9be6 eyr:2023 hcl:#ceb3a1 ecl:gry

eyr:2029 ecl:gry pid:752489331 iyr:2015 hgt:167cm hcl:#18171d cid:70 byr:2002

byr:1938
ecl:gry
pid:764937909 iyr:2014
hcl:#7d3b0c
eyr:2022 cid:145 hgt:184cm

cid:340
byr:1924 hgt:169cm eyr:2026
iyr:2013 ecl:amb
pid:499844992 hcl:#18171d

pid:838417672 hgt:175cm
ecl:grt iyr:2017 eyr:2025 hcl:17aa1a

eyr:2020
byr:1925 hcl:#341e13
ecl:brn cid:342 pid:047426814 hgt:156cm iyr:2012

iyr:2011 hcl:#341e13 byr:1959
ecl:amb pid:969679865

byr:1978 cid:320 hgt:180cm hcl:#435ceb pid:363518544 eyr:2023 iyr:2016 ecl:blu

iyr:2010 eyr:2028
pid:183cm byr:1948
ecl:oth cid:133
hcl:#8d3298 hgt:190cm

hcl:#6b5442 byr:1929 iyr:2019 pid:207713865 eyr:2029
hgt:166cm ecl:gry

ecl:blu iyr:2019
byr:1985 eyr:2030 hcl:#866857 hgt:155cm pid:659180287

ecl:hzl
eyr:2020 iyr:2016 pid:440624039
cid:147
hgt:61in byr:1976 hcl:#733820

hcl:#341e13 pid:178082907 eyr:2023
iyr:2015 byr:1956
ecl:amb hgt:163cm

eyr:2023
iyr:2011 hcl:#cfa07d hgt:164cm
pid:291621559 byr:1960 ecl:gry

hcl:#efcc98 byr:1976
iyr:2017 pid:394566091 cid:248
hgt:176cm ecl:hzl eyr:2026

iyr:2013 eyr:2029 hgt:152cm ecl:gry byr:1984 hcl:#623a2f pid:511780941

pid:953716819 iyr:2010 hgt:156cm ecl:amb
byr:1947
hcl:#18171d eyr:2025

eyr:2025 ecl:amb
iyr:2016
hcl:#cfa07d byr:1925 pid:322787273 hgt:168cm

hgt:59in iyr:2012
pid:916978929 byr:1959
hcl:#c0946f eyr:2021
ecl:brn

byr:2018 eyr:1929 hgt:187in
hcl:z
iyr:2003 pid:0377361331 ecl:utc

byr:1949 hcl:#fffffd pid:071791776 eyr:2030 iyr:2015 hgt:71in ecl:hzl

hcl:#341e13
hgt:154cm byr:1927 eyr:2023 ecl:blu iyr:2017
pid:639867283

hcl:z pid:315276249 byr:2026
hgt:151cm
iyr:2028 eyr:2020
ecl:hzl

hcl:#341e13 eyr:2027 byr:1981 cid:342 pid:999898177 hgt:187cm
ecl:blu iyr:2011

byr:2009
hgt:73cm iyr:1921 hcl:z
pid:181cm
ecl:xry

ecl:hzl
byr:1925
pid:034183103 hcl:#341e13 hgt:158cm eyr:2029 iyr:2010

byr:1976
iyr:2011 hgt:177cm pid:833479839 hcl:#dcab9d ecl:blu eyr:2020

cid:230 hcl:#7d3b0c byr:1954
iyr:2014 eyr:2026 pid:122150889
ecl:brn hgt:182cm

hcl:#a97842
ecl:brn hgt:187cm
eyr:2028
pid:427631634 iyr:2002 byr:2004

pid:912516995 ecl:hzl iyr:2017 hcl:#ceb3a1 byr:1929 eyr:2028
hgt:155cm

pid:019809181
cid:128 iyr:2013 hcl:#f5b9f7 byr:1931
hgt:161cm
ecl:amb

hgt:64in byr:1924
iyr:2016 eyr:2029 ecl:hzl pid:474940085 hcl:#c0946f

pid:172419213
ecl:grn
hgt:193cm iyr:2010 byr:1973 hcl:#6b5442
eyr:2027

ecl:#7b5cfd iyr:2019
byr:2016
eyr:2040 hgt:191in
cid:187 hcl:z pid:#c61084

eyr:2032 iyr:2014 pid:430247344 byr:1967
hcl:#ceb3a1
cid:241
ecl:brn hgt:178in

hcl:#623a2f iyr:2017 cid:235
eyr:2020 byr:1978 ecl:blu hgt:175cm

iyr:2013 ecl:amb hgt:174cm hcl:#866857 pid:285533942 byr:1954

hgt:152cm ecl:blu pid:952587262 eyr:2024
iyr:2019 cid:268 hcl:#602927 byr:1947

hgt:176in cid:245 byr:2011 iyr:2018
eyr:1987
hcl:z
pid:346518170
ecl:utc

hgt:180cm
iyr:2015 ecl:brn eyr:2027 pid:807494368 cid:324 byr:1980

byr:1936 hcl:#866857 ecl:blu
eyr:2021 hgt:187cm
iyr:2016 pid:244556968

byr:1950 cid:125
iyr:2020 hgt:168cm hcl:#c0946f eyr:2030 pid:758313758 ecl:blu

eyr:2021
pid:618915663 hcl:#cfa07d iyr:2018 byr:2002
hgt:157cm ecl:blu

byr:1967
ecl:brn hcl:#c0946f pid:200495802 eyr:2021 iyr:2020
cid:335
hgt:181cm

byr:1996
ecl:brn iyr:2015
eyr:2030
hcl:#fffffd cid:207
pid:022460311 hgt:158cm

eyr:2022 hgt:59cm iyr:2023
byr:1974 pid:354098699 hcl:b244f7
ecl:#219505

hcl:#866857 eyr:2025
pid:370874666
byr:1947
cid:162 ecl:oth hgt:186cm iyr:2011

ecl:hzl eyr:2029
byr:1981
iyr:2012 pid:433430792 cid:252
hgt:171cm

pid:512473844 hgt:186cm iyr:2012 eyr:2028 byr:1949 ecl:hzl hcl:#18171d

hgt:60cm iyr:1934
ecl:#4a4017 pid:3067366202 hcl:1161df
eyr:1938 byr:2008

pid:119509757 hcl:#cfa07d eyr:2022 hgt:174cm byr:1983
iyr:2015
ecl:blu

byr:1955 eyr:2023
cid:114
hcl:f1aa8a pid:609049659 ecl:grn hgt:177cm
iyr:2015

eyr:2027 cid:284
pid:654627982 byr:1964 iyr:2018 hgt:168cm
hcl:#fffffd ecl:oth

iyr:1988
hgt:191cm hcl:b87a62 byr:1990 ecl:xry
pid:996624367 eyr:1960

pid:641466821 eyr:2028 hcl:#7d3b0c
iyr:2010 hgt:175cm ecl:gry

hcl:#b6652a
ecl:oth
byr:1926 eyr:2030 iyr:2019 hgt:183cm
pid:057196056

iyr:2017
eyr:2022 pid:936841429
ecl:blu hcl:#6b5442 cid:179 byr:1927 hgt:161cm

eyr:2021
cid:289 hgt:174cm iyr:2013
ecl:grn pid:329574701 byr:1970

eyr:2021 byr:1939 ecl:gry pid:933505139 iyr:2014 hgt:173cm hcl:#7d3b0c

cid:116 hcl:045bff eyr:2030 iyr:1920
ecl:brn
byr:2030
pid:#38f7f3
hgt:155in

eyr:2028
pid:225829241 byr:1928 hcl:#cfa07d iyr:2019
ecl:oth
hgt:166cm

cid:80 byr:1936
iyr:2017
hgt:94 hcl:#2e7503 ecl:oth eyr:2030
pid:597284996

ecl:oth
iyr:2019 hgt:76in
byr:1956 pid:821874039

eyr:2026 hgt:168cm
pid:019015588
iyr:2010
ecl:amb byr:2009 hcl:#623a2f cid:159

iyr:1980 hgt:167in
pid:380644909 eyr:1966 ecl:blu byr:2004 hcl:z

eyr:2020 iyr:2013
hcl:#08ad66 pid:540886868
ecl:oth byr:1980 hgt:158cm

eyr:2026 hgt:186cm byr:1995
cid:275
hcl:z iyr:1958 ecl:blu

eyr:2026 iyr:2012
hgt:61in byr:1936 pid:390833536 cid:298 ecl:grn hcl:#623a2f

pid:393878498 eyr:2023 ecl:gry byr:1943 iyr:2010 hcl:#888785 hgt:158cm

hgt:191cm cid:197 iyr:2014 byr:1945
hcl:#fffffd
eyr:2020
pid:183948344 ecl:amb

ecl:gmt hgt:88
cid:260 iyr:2024 byr:2022 eyr:2031 hcl:z pid:#532c6e

hcl:#a97842
hgt:160cm eyr:2024 ecl:blu iyr:2015 byr:1970

byr:1964 hgt:178cm
eyr:2025
pid:813643223 ecl:brn iyr:2014
hcl:#ceb3a1

byr:1965 eyr:2024 iyr:2018
hgt:165cm hcl:#18171d ecl:grn pid:475669993

hgt:116
iyr:2024 eyr:1974 hcl:504345 byr:2010 cid:206 pid:166cm ecl:zzz

iyr:2014 eyr:2020 pid:096460673 byr:1948
hgt:153cm
ecl:blu hcl:#341e13

hcl:#ceb3a1
iyr:2017 hgt:67cm
pid:178cm byr:2028 ecl:brn
cid:293

hgt:157cm
hcl:#602927 byr:1941
iyr:2012 pid:611003211 eyr:2029

iyr:2019 byr:2000 pid:083917767 eyr:2024 hgt:172cm
cid:248 hcl:#7e4d15

byr:1946
hgt:160cm iyr:2020 hcl:#559278 pid:989139577
ecl:amb eyr:2020

pid:165cm byr:1927 cid:178 hcl:#733820 iyr:2017 hgt:156in
eyr:2029 ecl:brn

hcl:#18171d hgt:163cm eyr:2022 byr:1962 pid:639124940 cid:258 ecl:hzl
iyr:2015

cid:123 pid:4542006033
eyr:1987 byr:2010 iyr:2029 ecl:amb
hgt:191cm hcl:#18171d

hcl:z
byr:1928 iyr:1965
eyr:2022 hgt:75 ecl:oth pid:400765046

hcl:#c0946f hgt:62in
ecl:blu byr:1978 iyr:1923
cid:260 eyr:2021 pid:404628742

pid:#bf1611 ecl:grn
iyr:2018 cid:146 byr:1948
eyr:2025 hcl:#fffffd hgt:87

pid:767547618
iyr:2018 hcl:#b6652a eyr:2029 hgt:165cm ecl:hzl byr:1937

ecl:blu iyr:2019 pid:960083875 eyr:2027 hgt:71in hcl:#c0946f
byr:1921

iyr:2011
pid:9562042482
hcl:z hgt:59cm
eyr:1994 cid:258 ecl:#6c1bcc byr:2025

eyr:2028 pid:494999718 byr:1928 hgt:176cm
iyr:2015 ecl:oth hcl:#733820

cid:78 eyr:2020 hgt:160cm byr:1947 ecl:blu
hcl:#b6652a iyr:2016 pid:069457741

hcl:#6b5442 iyr:2010
byr:1971
eyr:2028 hgt:169cm ecl:brn pid:528961949

eyr:2028
hcl:#7d3b0c
byr:1952
ecl:hzl
cid:317 iyr:2016
pid:832169844

hcl:#c0946f
ecl:brn
iyr:2017 eyr:2028
pid:161390075 byr:1993 cid:50
hgt:171cm

ecl:#ae12d3 hgt:74cm cid:239 hcl:z pid:345439730 iyr:1924 byr:2029 eyr:2031`;


/***/ }),

/***/ "NBYF":
/*!****************************************!*\
  !*** ./src/app/solution-code/day06.ts ***!
  \****************************************/
/*! exports provided: daySixPartTwo, daySixInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySixPartTwo", function() { return daySixPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daySixInput", function() { return daySixInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function daySixPartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const answeredYesQuestions = fileReader.readEntriesSeperatedByWhiteline((lines) => {
        const asSet = lines.map((line) => new Set(line.split('')));
        if (asSet.length === 1)
            return asSet[0].size;
        const letterCountMap = new Map();
        asSet.forEach((set) => {
            set.forEach((letter) => {
                const existingNumber = letterCountMap.get(letter);
                if (!existingNumber) {
                    letterCountMap.set(letter, 1);
                }
                else {
                    letterCountMap.set(letter, existingNumber + 1);
                }
            });
        });
        return Array.from(letterCountMap.entries()).reduce((prev, [, count]) => {
            if (count === asSet.length)
                return prev + 1;
            return prev;
        }, 0);
    });
    return answeredYesQuestions.reduce((prev, next) => prev + next, 0);
}
const daySixInput = `lqhksfnerg
negsc
snage
engs
sneg

ctfzrdbsapql
srldfatzqcpb
qsntlprfdbza
ldptswouqbxzafr

ncjolhqfbp
gphonqbflxj
jepdmfhsqtonz
cqpihonjbgf

abytu
ayu
ayu
uhodlay
uay

kzx
xjwk
kxfhsdc
xjk
jkx

rwxckmfn
xpcrkft

ntaf
lacuserbk

sxwdfmnpl
xpsmnwlfd
lpxmwsndf
xfdmlwnps
pwlnmdsxf

gjvcfamuty
uqfmjgzatpvyc
yfcjtavghm
amqfjkpgvyct
svgcenmylotjafbx

yepqgs
nsfqwghce
segvq

mi
l

eirgvuadbphcfsmyqnzotxjlk
qjeintsxubmfchoavpyzglrkd
fdjeyhbxgqclsnaimoptkvruz
iexuntjgmvfhqykspzbdclrao
hkjgpqlyaxdtcnvobmrzifuse

i
nl
on
zbp

aqpjnkeowivfbdhgr
pgiojefhvrqdawknc

ugmsibf
msbigfu
csgfimubj
mfisbgyu
nsmvuigfbe

demjnxcwbsri
aypesftqhzluko

ecoxhl
lochex
chelox
xhcoel
cholxe

xntubrdemhylsoi
gfjihrutbaewzpoxlys

iuqkewnyv
uyptkn
nyupsk

e
f

bxrsntkjdwivceapq
cqbakpimsvetnjxwrd
knvxqwpasurcodietbj
xvrqbdjiwsacykpent
npsavtbqxijkewrczld

pk
qpwsk
zpk

qdchnb
qwxbcdhyir
jhbdcq
hnecdbq

tdryep
th
vxg
bre
e

f
d
d

rspjhlqocixnw
xicoqjpnlwsh
lxinqphjoscw
jhlowspincxq

qptb
btpq
guqhbtpd

nzloqtcxmfgdbj
tcfdnbmzgqlxo
bqkgnxazecltidsoymf
wtzmxcpflbongdhvq
zfroctngqdbmxl

kcyhtoendvzwafbmuj
eltymcnhaowbkdzvuf
sfkmvobdnteuychzaw

wetrpdnqab
qrpkenabgwtdl
nahwtbrpdsef

hqbtefp
xslnrykmvau
zghcqtojidw

gqsyhx
vcent

pazioqhkbd
qnopbmrahdyk
dxbmkhaqotp
vkhaofqcdp
kqpzhaod

ytljngqdmxfck
tcjmkfnqlgydx
mfctkldxqpjuynvg
ldtfnycxqkmjg
lndxtfkymgjcq

elrfwpobjxa
mtpfoarbsdj

qigtfkwhobpvrcyzjuelnd
zcawdbogrhqnlieyufpkt
hqlzcnrikfypswutoxbegd
butncgpyovzrlfwideqhk

ozdnivyjlwkp
venpbsuzlodyw
xfdqnzhwyopvltcr
aizdgmlywponv

tqg
qt
rqs

whm
vadomyl
wmnqh
gwmps
mcnu

loav
zdl

vsleinyhgo
kshrxvaymptw
cqsubvf

ofd
fod

pdjrszhgkfe
dfshzegk
edhzfkgs

wti
ftcwib
iwtoz
wiut

joebqrhgxvst
alkgprwetohvznqdmcb
vbrgeoqhyjtix
thrfequgbxvo

ejx
ezfmnx
iderjhxc

hfrqe
rjambh

ytsdznehwg
dwrohqyvmscgjz

xdatzefv
kcxwhypoanlr

tbvdcol
tblcodv

kg
kyg

wxtezyuomkfdhspqjcn
xuoqwtphyckfjndzsme
ouzwykhqfcndmspejxt
ncemfpxsquzwyhdtkvoj

dyfvmobrspnlguqaw
vhalnuwbypod
xjuawvbptnyohld

bmytkawjszl
jaystwzmkl
msatlkwzjy

vghcafoer
graecvhzo
uavrcoheg
rhgvcaoe

nvjga
avgni

g
a
g
g

otxj
xtjqo
xtoj
jxntoy
ltqjxoa

i
ji
i
ai

w
pw
qutdebyio
w

camyzohlbrgd
ygcalmzbrdoh
hrbycdzmalgo

hgsltxvwmc
loxsntghvdc
sgxclthv
ctvxlshg
yxcvsgthlf

ekizadqujopgx
zuagvjsirokwpx
uoykijgpqaxzc
gqkoixpyabdjuz

qjygvhmlkdbzsifcwapuonxrte
desvfncpryjamkzhgutwoi
nifhzpertsgmycjwauokdv
swohafgetuyvicpzjrnmkd

dybpeckxz
zucgeyipqdnl
wspyefczlnhd
prevcytzod
pheyjdwzc

vbpfnedqyoawhcr
qrhcewvabfopdnmy
afrvebhdocniykqpw
foqeawrbvyhpdcn
ncwaphbvoqdrfey

dwj
wdzj

mr
rm

idnkmufx
demjykixo
kjdmxiov

ukbflqhomzrwastyjgpex
voqkyihjufmxswgrztbc

tjn
njv

ruika
irkua
wairlkszu

rfgphcezl
zcreg

mce
mec
qsme
mpeyf

wjcxoftvnr
zomvfjnyw
nywjofvtm
kvwhfunajolsigq

y
n
n
y
oe

nvjkryifxace
ziehtgnjfbyrlvka
xnpvjismakeyfr

g
g
g
g
g

vwgnj
ivoj
ugjv

myzrbf
ymczfr
vmwroxhfj
mlfdr

ajqerszpbdyvoufwlmgcnitxk
wmzuftgdkavjrlibenpoqxcys
gnpmcsxlwzvfateqdirkyujob

bnfudi
inay
iuncv

trqlgxaeouy
uvoqxktwejyr
otqeuxyr
xogreiyqut

ficdymxhuboq
dvwiuexfc

zbhndug
ugsdwphnv
nugdwh
dughnjio
jgsyuhnd

f
qrcvkfu
f

yvf
yfv
yfv

qtnc
cbqn
qnc
tcqn

rxyhizgjklumv
fidxgjlkyhvr
avncxqrjbkgplhiy
zrdkxtlgjvyhi

zjq
f
u
prgot

hrgktyczsvnmiolewbf
gbowmtzvynferksichl
svgbrzmcolkieynfhtw
vehwtyrmgsnickfozbl

lbucxdo
jlcgdxiu

hvtafpnwzex
vnxzwftehp
hezxvnpfwt
tnehfxvpzw

wbmyejlv

gevqi
eigv

unogtlfwvcyjdr
jcuvlftdgnwroy

kdlm
pklw
klfay
lk

somjqeuvdk
rzaqodkmvxsj

g
g
g
g

ceihqtrjpbxso
xohipcersbqj
pibhoxsrjeftcq
pbcqvosehrjix
icbqhosrpejx

jvldsruex
oktrdvslcujx
xdurvpjsl
mxesdiujvrl

rgcdsax
alqsbd
fdavzs
ijsutahdpye
baqdsz

jxcabgpuimtekqsy
iduqmetsognaybxp
yqwaburlxps

ulesvzoijdnpfhkacwmxbrty
zvxrdjskefbthimwnpayoul
ihdnlkxrpgwjbyevozuatmfs
yixowledpbvrthjkzufsmna

hxibvuzdowysmflpkqjgacnr
bhctimdakyqlsvxwjprounfg

xolza
axzl
xazld
lzoax

vjpdirbzwmcyeqtfgoulhsk
shzpugkqlobmridvjyewfc
ybufwljhrcdegsiozqvkmp
ucnbokilmgvqwjzsfphaeryxd

fzwiyxutvmdpbqkgrj
vmqludbfywzkxpijtg
qwkuzbfxyjmdptigv
pmgifdkjtbuzywvqx

jvxwlqr
rqfjmsveoaw
ptbyhvjqw
qwkvjxg

qnaxrduhpfvoyjbksgw
qjnwieaoxrsfpzdhk

nrcmyksodhaztijuwblv
ksxrufaqhwbcnme

sqx
sjbql
gsqnpwk
sq

cpgkrjvqx
vgkpqcxjr
qjxckapvorg
xjvqckprg
gkqrcpvxj

ojyziuqkbe
fvuceart

qpgyknd
kfvyjtd

phfmqdwxnuvgo
ouxdblhnmpgq
amxnpihkdusoqr

run
dnx
vnc
ponklq
nur

ixoytfqugrvjzcdwlhkbesmp
qalryztjxumhevifnobpcgdw
bothiuxqjzefcglpwymdvar
lgfjctrixhzudaqmebpvoyw
zlwfoituxvdpqbejhycgrm

lrwvkj
jqwc

awvyst
vtysa

ugxys
x
x
x
x

ismv
mfi
ihofm

lijwuxcbrfotekpangzmsvyd
onmsdklutybrcqavegwfxijp
vnyarmslcetoxjkwuqgdipfb
jtrsdmfcnwiveyxlobhukgpa
msatlerkovjnfgdicuywpxb

xmyen
enymx
myxen
xyemn
xymen

oaustqdifyxepkrwh
kbcvmrjn

uqv
qrvw
qv
vqtmu
qv

lo
l
l
t
l

aoqujemitxrszgnywvlc
lauzwhvr
akulrbdzwv
lrwdpvhauz

jhwycgso
trshda
hs
sh

oydxjrhetainw
nbwdxloetyiar
entcioxrwadyh
tonyexrpdawi

bkdrqlnjwshi
nkidbwshrqlj
hrqvfldjinsbkw
khdbsnwrjilq
wjnipadhqkrlbs

iusqovtzgajpndcwl
icstgzpurhbwqnvjoka

hvwcue
chwnejv
cxwvath

yroksb
tbs
swb
sb
sb

vgixnfosrpetb
rwpndfevylg

alytpjgxn
styjnkmegil
npfyakjgxlt
vzdhtlonwygbjq

dp
dp
pd
dp
pd

cav
i
ac
chzu

kdv
fld
dwq
qds

x
wanxl

cfborlazjq
pfcloajrwqbz
btonaqzidlfrgjc
lcfjzqsroba

o
n
kwl
s
f

oylasgwtbnu
wstxylzug
ikjvuqwltyhgs
ultbomgwnsyax

iotqspcwuhr
uplinrgcvhews
tduspchwrim
sihrcbquotwp

qjdnkl
ldnqa
qdiknl
qdmnlv
sltxwbqnyd

rnzmybp
zfnwc
nkazdqg
uzesvmjn
vzn

emp
epm
pem
mep
mpe

zxhde
demhz
jadu
ckrpvglsw

pegn
gnep
pgne
engp

hjkeoyrglpcitbva
ubtzsmvakoly

u
b

ksanb
sbk
sbk
skvxdb
bkfs

z
z
zo
wuqmz
gz

jwbyaugknetqrmoxh
axwnmobetrjqkdyuhg
omvjbyhngureqxkatw

lqdiban
ifbazln
bafzinl
ifsbanl

dovkxjylabqmtizw
pawvoxdmbyizqtj
vwubiayopgxcjzqdtm
qbjtvowdnzsixamy

ykpusjaqclowb
kjsclynwqapobu

zasypunbwitorjvmeglqxhkdcf
bvlirhqwgskftxedonymuapcjz

ezxghwr
rzgxnewh
erwxzhgv

nkfvplstgaybmhorewzu
lakohrfuznjdsqvgmywp
tuyshcfwkpabzomglrnv
clnsrgvowhufamykzp

gbrln
pb
b
bsw

ugcnskomzepjvxifrtwq
vpmkutefjzgwrbsoncxiq
cmkesufoxvqprwidzgntj

rpsheibkg
bokwgjeh

sfwgbm
jmfgbws
sgfumwb
bfmgws

qfxderyt
ikwyln

nsrjpbtxuvcfgl
putvcjfrdlsonxegb
vgbjtrlsfxcpun
lnbgctvmsjrxiufp

cnawzexsdlubpm
bufnvdiaxptlcmse
lbyugexmdncspa

xtvpcfsdzewmgaqb
felcxvdpiqnuymow

xoqt
tqxp
gtfqjkvbu
tqa
qta

jplacdti
apfliojtcb
ilcapjtk
atcjilp
tuipnjleyasc

by
by
yob
by

m
mp

kenjrtgyvxiqwmazchfbup
dezplgiwyxrq

ra
wa
aw

qldpihtceyfoksa
cfsopeatkilynqrdv
xctlfjsoapiguyqdke
syiupwbjlacefokqdt

sc
twsq

ewc
ce
ce
ceiaf

wnqfklygehirdxazup
vqgepxnsziakrw
eznxgqwpriak
irnqvzwkpaxbeg

gu
au

ujvidwoe
jekiubdov
idunjveo
eidvunjo
evinoyduj

irytzs
jhnr
r
mnrjdb
rnv

ug
gu
ug
ug
ug

ifndua
rafyduin
ufhvnadi
dyguamifn

aihwljuqkezp
wzaiqlp
iplagzwq
qwizmpla

pvedlxntwjf
veldpnftwj

xvglbzusemwqihn
vkdbefxrtimp

spcwi
pjewi
idpyfb
ivp
pwzioj

e
v
za
z
g

mjvxyaguoc
qlhypbgw
qegylr
gklyrniw

tv
l
l

tmrzoldvsiu
owzpglsidvtmu
hmtjvlodxsubyzi
tuvilzdoksma

yenvdmsagq
nihfbxaymg

hcylanqdjmwrpixbo
qmwxybpcdalohn
mxwoazyphndcblq
wzbydamnoqxhcpl
mnlcadybwxpqoh

miupnhbvj
uwpnbhxjqiv

rqgta
awkxo
hzjsdb
awfu

gskncrox
npulc

iugzcseolh
gshioluezc

jqbi
pjqi
bqj
njoqv

eitjbcr
lpskbhyfrgxuzoiawv

fejdyanx
cyfjekxdon

gqzniubejkx
zjingbqhuexk
gknzxqcuijeb
uxjnzvergikybq

wub
w
tarx

ghpi
hiasg
ahip
yicd

brysq
hkgfbnmacr
wprtbyqls

lzfqot
qolfz
lqfzkor
qopmzdeflcx
toqflz

vhremdpywtabokuilx
oryhfcztaixlvmdwup

mwvqzngluxpcoeidk
ufcgnxjvmdzqikhlpw
lwvkxmciuepndgqz
glmzpqknieudvxcws

ibrduwhlcxtsnpyvamekzjf
zmuevtynhpfskralcwjxibd

rvdpebnwsiugmaqzxj
sidlbyakwrhvgmjoef

q
q
q

jofkmbcunaxet
elqngabhskmy
wkmxacenib

ezfpogadrbulys
sbamgenyopfzu

utagkdzvwoqemchb
zthluvqinacgb
qcjhvutilznabgy

gduwcpj
bcxgdswpurj
pujdwmcg

zxcagirye
uzrljgq
gwtzhfrb
dxrgze

m
m
m

mzf
zfm
zfm
mfz
zfmo

ovdqzm
dmqvoz
zmdqvo

bisprlndef
abvltrnkxd
rndbyl

zmglywve
lyvegwz

gtmrhpujzfqskoxavydie
typwiahqfnkdumvgoxresz
qzevtxauogipcksyrhfdml

rcova
pjcab
upacjb
alc

kzp
kpz
yz

aivymnlux
myuxvlias
lmyauixv
viumlxay
iyavulrdexm

smgjbqifah
bixgqsfmha
gsfqpnmhbilae

yb
fy

hfvcgd
hfkxcugdo
fhemcdgo
hgqfxdcy
begthcfrdqi

gcwtjyluzvbsnrkopmeai
uzbtyinrqmofsjdkcvwega

s
s
s

dsvpg
gdp
ndegr
digp

jiylzgcomkurtvqpa
yvmjtapingcruo

auijcbwfqkxyshl
xwhcyqukbislfaj
yiqcljkxfasruhbw
cjlfkxyqwuhiasb
iayklqhucsjwxbf

z
s
s
si

brayc
cykwbra
rxbcva
ckdabrh

rlfvawcqemhub
ctuqfsbaehm

wbrzpyacqhi
bmpalyhzgrc
vbazpnyshk
hzyijfacbp

wgjohx
sxhjgwo

alhkqy
dahfmjlcy

g
g
g
g

lpsbynokvrudcgzqmtijhx
snuhqjlokypfrbvcmidxg
yhwbjmxopvirguqscnldk

mwzsclu
yuwslzm
alsumwz

maj
mjxal

asgryznlwqjdfcpkehbm
knehsopgjdrqa
dnapshekjgvqr
ajendtksguqphr

puznxmqsrtfdckvyijbalg
kcgytbmsxvrunqjzlfaip
yuikxpqtafvbnszgjmcrl
qkvagxcjslbytnifpumzr

pglvfdihqa
pntwkbzeco
ep

fpjmzitnlkvbd
qdbknvtjfilrzm
bijznpmlkdtfv
otbjfznlmvdhsik

x
x
gx
xk

b
qge
kycnzjw
pixlb

cpzgaufikyltmbqvesoj
fusibtgoayvjqkpe
ovtfbasiekjugryqp
iubyfkjqvsoepgat
akofugibyqetpdsjv

yirboahn
ozvha
oah
hoav
aehco

hspqcxmjrbfyktngi
sptqigfklmadncxrvybh

wdksztumeroaplhxqbyvjfin
tadflskombxyhqewjrvipzn
afrejdkobnhstqyilpmxvwz
vzynhwtafpdqlkjoirxmebs
kqjpwxrdvtizfmlhenysbao

wonxesaihurqkymd
sxyqkmwdbnljrgueiao
whenxordaumqksyi
krouemnawsidyqx
rmsukxeyqonwida

ckywportslfhdaqixvmjn
gkvlapqwfscjzruoy

dtevjz
feqndzgxlvrtboc
zteuvkd
dszvuheti
tvdewz

ehaqfwylskdbzvmpgt
vagbfeqwptszykhmld
arpzbsvmweytfugjdchqlk
gpmvqkawhdstzlyebf
btaesiwkvpfdhzymlqg

hozuack
yuaznf

ozvmpady
paydovmz

gtmbeikr
breigtmk
gebkritm
kmibgert

jm
m
ml

frexcnogyv
nrvgyzilodxufeh

btvzjpu
zjvtubap
btzujpv
jdeptzvub
bvzpjqut

fkdcirhqt
cidhrkvfq
icqdhrfvk
vktrchidfq
ldqascokxrhfig

tlgjdsoapmciey
gitdwojaeslmynpc
dtycalegpmosji
mydoitvespcjlga
gladijvyoctfsemp

hwieujqgsxc
sgxebjhnuqwc
kqgcxwuhtvesj
qgecmsjxwhu
cwjqmugeshx

qjwldfsri
iqgbedvlsfrh
ujnldiksfqmpyrw

a
a
a

spotgrheckwqan
shwvnatgpkqcyoerz
hcgasrpewnoktq
tkewponscaqhrg

bjrsxkeiucnpoz
xrkczspbfeu
kqcuytdsrhvgplbxa

at
ae

x
x
v
x

ds
dr
xemdno

bvpdiocu
pzvhuyxci

a
u

d
d

rplowaxqj
rqvowa
yrombawnsteq
acujvqowr
wrxloaupq

s
k
k
k

zmn
pfgseobimq
mdkza
mzyvd
kwhmr

uqmtreg
twleuoqm

hm
mh
whm
hm

ydegnjfmkr
kvglzrfs

kovgzemjf
kfyighomzelj
fkzxtueogjm
fxkjozgmue
zofbvejmgk

zatrhwfjiopulke
satohknewfuipjlzrv
ekioxurwfljpztah
lgqzopirjkhwaufte

xgbozwltnevidfrjuhcysk
gwsmtbkroyfinadpjhevcxq

x
dx
mxzr
x

kaof
kodf
ofk
fko

rkuoazney
azyrqhtdo
yalobrzcw
xioayfrze

cusyzmjhqloftdpakegin
lmnjipdyogkfahuqstcze
mneocjwgilpfxzthsayqudk

m
hwyug
ymna
drptzijlc
wm

pg
pg

lrobg
orqfnsv
nqao
ojmwdecz

jmxlkan
mlauxtj
olcwmeaxqjnk
jxbpmltar
mljxdiszyagfv

sgriuf
ugmpoxvyq
dgzcuqwnh

m
e
m
y

dqkh
qdhk
hkdq

znfwuiodcryqsmbpvejg
xnqwcjrdebpzmgovysi
pihmyewrcgnjzqvdabsuo
tqdsnjwzovrbcgeiamfyp

meztpcwrsnojquxkg
mekurwxtncojsqg
ktjwqocsnugxerm

eplzc
ezpcl
lzypec

jmlrkseozxdunqf
dknseojuqzmlx
nsxqljdeukbmiz
sqmvnxubokizlejd
ctqsjmlkpwxzdunghe

klqgxyrdt
toykrdqgl

fwkzcuvmogxjrbelthi
zfhtgbqnomvwxku
fuozbthvwkqgmx

s
x
x

pefqgwzlimyjncouh
qaduwhmysxjopieftrl
ojfphequiwmnykl

ksfb
sbkf
sfbk
fbqvks

eomabw
wemarv

ghldr
iw
yj
po

lpihfvqersujkzyb
vjlfrebkiq
jblqifrevk

zgr
zg
zg
zg
gz

hfvydluaxgipsq
otqcbfurygsvempk
ljnqdswvgpufy

gdxbjivufyolq
usmbflyxiqdv

kpfy
yrfpk
fpyk

oencuyp
uceypoi
cypueo

orcfsjhvxaqynibuk
cbixuyokaqvrnhsjf
qcoyfjxukrsnhavbi
fkyuhbvojnsxaqrci
vrcshuqxyfniakojb

mvgbupxhfesodnzwjcq
dcjxzqyuepnvhfbsmgo
kpmzrsfebgaovnhcxu
npxgivuohmwsjefcbz

xaujvbesdqgnz
augndvqbcjfzs

eoyhpnrcldjbqfvtiua
laoyrgqzbuhndxwpvf

pxfnblvuzijhdq
hdkljpbz

jphqxmkwgsycurietbadzfv
vweygbzashxqcdji
wcbjdniysvhqeaxgz
dqxwhvbozjaiysgce
zwxghisaqbycjevd

bzqgcuerktfsavwhnoydi
rbvyqdsiokcuganewhtzm

tom
to
to
to
to

rkfmtd
vkcunbq
rk
kf

pkmifxjtwnz
kmsfanxteihjp
nmaftdji
ybqimuvojntf

ns
r
r
cvhm
wnias

mfsxucvboyj
cxomsbyvfj
fsbvomjyxc
mjhcvysbofx
xmfjcybovs

quxomeysk
uqtokyxsm
yqohxbkm
uyoqkaxm

br
rbi
brj

paqhkzmcwfrsiubtvjnx
zktiqbucarpwnxmyhj
aikmgtyucrjnpqwhxzb
jkabpxztcrwhuqnmi
mnxzwbaitqrkujhpc

szbanq
oegiflu
as
qpt
t

qsu
faqiu
qsui
uroqckjv

ufkcrahgitoyj
xknlcfujagd
gjcklauf
jkwafgcu

gdmxn
boiygrca
hgs

ybwclvjfkumxso
nvmkyowedlijuxcfsb
lzmqscybvxfukro

fiprvjsgcenhtmalxzqo
phcgntoqmeviajfxlszr
zsxqctnevliohrpagmjf
sqgipcuanmtxlrvjehozf
vlczqjgoipafetmrnhxs

ypwbf
pfwytb
pyfbw
btfwpy
ybpgwf

wrzhafdpmx
tzspfhxnd
dkfhzwst
bgelqjdcyfizvhou

peubvwgaqiclkfdxmsyjtr
kuwpsvlxbjrditgmqeacyf
btxejuiqcrpgslmadvfywk
gwalifqpdusrvmtjybcekx

qvmhulrt
wcpzdsifex

pohq
hqop
opqh
oqhp

en
iws
tpr
qs

lvfinmpcbzx
hkcsblgz
tcgzbkl
cblzw

rsjie
ewjribms
ijers

knizwxycoqe
dnqocbk
pkgsanof

hravnysejobwi
nlfusgdxtpqmaki

kuvboax
kjvohxa

qwm
mwq

xowbafsitjz
lawm
aylmw
wanur

qcdsao
dqaos
opaksqd

p
p
p
p
p

wl
d
l
n
rwa

rdi
dri
dir
ird
rdi

ei
e
e
e
e

favclpbni
icbfalnpv

uokmvxgafizceprnydsht
pkeaonhzruqxgvdfmscytil
fpxhsgcrutovzykaenimd
aszthkimoyxdufvcregpn

fgibsklo
dsokalnriegjzbf
kvwlocuys

icnortpmfwy
vnqrofpmycit

yaiempzjbvkgnrfco
tozadmejkbgqfcsiw

crgtkhbajzdmlp
epnsvfhib
pvbhn

fglxtqrb
uigxvbft
wxflbyg
xbpzndhfegj

jiolrqxfapuwdngybhktzcv
bnerupsdkflaqjzvitcmxo

znjus
qzsjna
znjs
uzjsn
zjxnks

snwj
w
w
pw
w

i
p
cd
qs

f
ofm
f
f

dv
av
cxkuo

rbxieoyczljtuqvm
gnphsrckqifzeljw

h
h
h
h
h

exghrdkbivqsmcwal
vhicaqdmlbrywxsgek
mrvcbskheadwliqxg
yrmckldaqeghisvwxb
algoshwxzmbrqjdevcik

omtswbxujpvfzd
yntcbxwl
aqtxyewb
tiybhgrkxw

srkxfjlgtpedai
digtrkjsxyapq
djxrgapiktse

fzlagmcnjwbd
chlzbgunwfj

qszghewkntxaomu
xekowrasunz
xnksoeawzu
wjxaoduensbzfk

oacfnvhugekystwp
ftncaykejwhbomz

abrcsi
xctrvokbsg
yaescfbr

vjwbpsleug
ghlwjekpbusv
jpuelswvfbg
yjwpvbeslgu
uwjegbpsvl

jkvqesnto
kjot
jkot
jotk
otjk

elf
nlg
vzl
yl
yl

rgbf
yrzmhbn
rbv
btrp
fzrb

uyetaqw
wheyaut
ateuyw
awyeut

swuaon
usnwao

udcyfksltzeqb
bkuycfstdqzel

gjmbfxieklohpc
oglhiuyxjekcmfpr
okelfixjpgmch

zixq
ziq
qgiz
iezq

sdbjl
vyjsdb
glkdnjb
hdefnbj
opjbmd

id
d

l
l

dsnze
senzd
dzesn

cegqnbzyhtm
ovaksmjwrdbpicxul

fzjxbck
ndjp
heyrsgaqm
tzof
xvdn

kxtimcjayh
syavicktmxh
mpxcfatihky
kyxitmcah
taxhmyickv

xlwjibshfgontek
njeixkslbogfhwt
hiwlbojxnktgfes

udsygjltikqrmv
tulkrgijvm
teumkjvlgir
vgjkulrimt
rghkmlvpejtiu

oegptdlksbixhcwqavjun
jacqedxslunipgh
enjgslzcmxupaqdih
zcndhlaqsepxugij
nqajehxpilcdgsu

shdieqwxflurjzby
wmtajifoqcupgnkb

xwck
ao

zkpfgvda
kdgya
qwnbiheos
jr
muxfjcl

wamxpysnl
qpydmrnj
nmypsl

k
xtvweuplk
aykc
kyf

uryfiabjvelptkmnsxow
pfcaoerluxdtnwjqbskm

wqenhkxgypc
dnltwxzaofs

srxmeabuodzq
oaeqdrubmzk
kdeaurobzqm

rfungq
gfunqr
rqgufn
nftougqr

jqthdmlfacp
liqumfdcj
qtjmglcskaf
lrbzwqyxoenmfjc

dgz
fj
x
g

qnhwlzjoac
wlzoajhcqn
jwqzcanohl
mwlzqonhjac

asqtlpwnrm
nparsmd
sarnmpf
nspamxr

ot
ozt

cuokwgjmhxzidteslq
ytfqwpieraosbjn

czoxdyvhasnit
zaxiovcynhts
juoyhvxatbnsiz

owsjger
oerwgjs
rwsojeg
ojswgre
ewjsocrgv

cmexibr
yxbir
irbx

nbgpodvsxmzfqiteuj
mnvtqbpxuszjod
jtsqpovbxndmzu
spxbzqmodvjtun
oumjnpsvztdbqx

vrwytk
kglvfrw
zxwusdonikph
mwgkj
warykt

rkdijofslupwqgtvaxhy
jzdsuprykoiwfvlxaq
wfboijqpurvslkxdya
skylwcmauoexpijdvqfr

pe
ep
e
eb
e

uzrmjehfktblxsivqpo
rovklpubzdsfiheqxmt
ekzuprvbtisxoflhqm
imuhkftvbrepzslqxo
fmrtxblpzeosuvikhq

oauifsgwqbtvkzxjycpml
kqmgzxjbwcoyiuvlatfps
pwjmqczoytaxgksvbiful
yqwsazxilvutcmbjopkfg
qtfdpxkmbzwacsgoiluyjv

ykcjafmxlbehuqtiwvs
zqxudnmysc
ngrpcymsqxu

qlyp
plqy
pqly
lyqp
yqlp

dtszxekb
sxrgbztedm
wsdnyxobqtl

oqmxabwknfy
mxyofkbqwaj

xfqrjeh
hfqrjex
qbfxrhje
xhjeqfr
oqhrixfjcse

pjaoerbtkqslx
fxkelnithrspa

tdrpcbksa
daksbcptr
abskdptrc

clidq
fqkmil
bioje

wjetbyvxhoumkp
bfyenwakpvotxm

adlqkrzvg
vlzaqgdr
zqdvryagl
lzarqgvd
arvlfqgdz

xfsb
xbfs
xgbzsjf

pbtrqilmkfwv
mkwflp
pkwflm
wfklsmup
wpkflm

qkjhnsczmueftdpbrgvixw
kdejtqhfswnbmupcgxvzri
ghxwkqupdtbvscrmnzfeij
fbmrgtkxjqevhywsdzcnupi
enskiwxgdtpbquchvrjfzm

u
u
u
u

fitcw
dfvzabyu

saewhufodzlxbjcrqivygmpk
jqxiopdmyluwkctsfzegbavr

zsdfpajrnvqk
bkaxzpsrndvqj
danpsvrqjykz
ujspgrndaovkzq
tljnarpzvekwqsdmhi

wyuemtvkdixl
direvlmytpnowauk
eigvlkwumyctd

jcrpnzalft
jacrutndpeixz
jczvantrepk
ergcajnptzv

iagonws
awings
wgiasn
anwsig
sngaiw

qogitsbfzmxk
kefoxbiqtzs
tisfzvxobqk
castjxbqpifozk
okbfsnidqtzxe

gocwh
otmhge
ogsh
ogh
sgho

e
y
ixmds

rtkcgwfx
tjxzckfhgbiw
aenyvmcfg

ngspdqwv
hziq
qx
yqtf
qjz

exgirhuwyjt
rxtuepwhgjisy
xtwyghrjeui
getuyijwcxrh
ughtwyxiejr

vdh
devh

y
y

m
m
mpv

ptvlsonebiqjwraxckumhzgf
lqtvbihsowmgeunckzjfapxr
xglbifczovtwrpqnmajeuksh
eoivpuqfcbhtnagjwkrzsxml
nubpeofjwmqvxgircahksztl

uyltcxrzjegmfwbkio
tgpxmuvsobicfej
esvgjxcfmuotib
xifognqmbtdujeca
bxhfmiejcgout

djaz
dajn
edja
tawdh

hyp
yhvp
ydph

z
z
z
z

jeixykzcrfd
zexmdjk
xkzdje

auih
uial
uia

ucwkeiadhgsr
ihswgkrudea
gwezhskryadnuoi

lvhmuranicfqpbt
bqhrlotfnzgacmu
fhdcslqwymbrutan

u
bj
pkb
pj
i

yg
mlyxo

q
p
u

yibeaxjpkcwsfm
ixpekjcaswmyrfbl
ecmbikjptafwyzsxq
sxfacbmiekjwyp

vyzhmwginr
scjl

s
c
h
s

qxhngcyijptvazme
gdiwlszqfbtvcpxnejhy
eghzaniykvpqotmjuxc

yasrbcwju
rzbacjug
abuzkxjcr

yjdgutwfreslm
jlutewfdgsmry
tglyjcefrswmud

cf
m
mn

zbwlnqrc
zwrpc`;


/***/ }),

/***/ "SwdP":
/*!****************************************!*\
  !*** ./src/app/solution-code/day02.ts ***!
  \****************************************/
/*! exports provided: dayTwoPartTwo, dayTwoInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayTwoPartTwo", function() { return dayTwoPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayTwoInput", function() { return dayTwoInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayTwoPartTwo(input) {
    function isValidPassword(entry) {
        const isLeftMatch = entry.password[entry.minimum - 1] === entry.requiredLetter;
        const isRightMatch = entry.password[entry.maximum - 1] === entry.requiredLetter;
        return isLeftMatch !== isRightMatch;
    }
    const reader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const passwords = reader.readLineByLine(line => {
        const regex = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/;
        const match = line.match(regex);
        if (!match)
            throw new Error(`No match for line: ${line}`);
        return {
            minimum: Number(match[1]),
            maximum: Number(match[2]),
            requiredLetter: match[3],
            password: match[4]
        };
    });
    const succeededPasswords = passwords.reduce((previous, value) => {
        if (isValidPassword(value)) {
            return previous + 1;
        }
        return previous;
    }, 0);
    return succeededPasswords;
}
const dayTwoInput = `8-9 x: xxxxxxxrk
5-8 f: fxffmfff
2-5 c: ccspwpc
1-4 g: gggg
9-10 l: lllllllllk
1-3 j: djjfz
3-4 n: nnnmn
8-9 l: llllllllc
4-5 v: vvvvm
3-4 t: ttnt
4-5 w: wrwws
12-14 x: xxxxxxxxxxxcxxxx
9-10 q: qqqqqqqqtq
4-5 q: qsktqncqqqdn
2-7 h: ngkhcthb
9-11 r: rrqrrrrpcvs
3-6 c: rccbcc
7-8 k: xpkmjlxkt
1-5 l: zcwdhpkvz
4-11 r: rhmzhrxrdrrtddj
11-15 g: lggndgggsggggtdggg
6-12 m: mmmmmmgmmmmmwm
4-9 z: zzzgzzzzz
4-9 k: kkkkkkkknk
9-14 l: fldlllllldqllwj
1-10 k: sbnxkmtbgdf
2-3 v: tjzvnfv
3-4 d: dddd
1-2 l: ltfwjqjlqpnbqmnj
2-5 r: rrrrr
9-10 v: vvvvvvvvvdv
16-17 j: jjjjnjjrjjjjhjjzqjj
10-19 q: qqqqpqqqktqqqqqtfhq
17-18 c: ccccccccccccccccmc
3-7 f: kcpnxfffpv
4-7 m: mrzmmtsmmmb
8-10 l: lmlllllllnlb
1-3 d: bzndm
2-13 s: szsssjsssssssss
3-8 b: bbbwbshbbbb
15-18 h: hhhhhhhhghhhhhzhhh
6-10 b: zbbbtbswrn
12-14 t: nttttttttttstzgt
7-12 f: vffcmffwfjpk
3-18 r: frvkrwrlrrdbdrrrrxnr
12-13 k: kkkpkkkkrkkxkkk
6-11 b: bbbbblbbbbbw
4-5 f: tfdjf
7-8 m: cqmmmzmmmmgm
2-4 j: jjfx
3-5 v: xvvvsq
9-10 s: sssmsssshgsd
1-6 t: tptbjsttt
4-15 z: zzzgzzzzzzzzzzz
4-5 p: mxpnp
2-3 n: knwfnnj
10-11 s: sfswsbssgssvp
12-13 d: dwndddddddlnddrdds
14-15 k: bcvpdjkkndkmkrg
10-13 x: xxxxxxxxxnxxz
5-10 f: fffkffgspffffzcf
11-12 t: ttttqtttxhtzzttt
15-16 k: kkkkkkkkkkkkkktk
6-8 b: bfbbbbtkbb
2-7 h: hlhhhhgh
3-11 q: ldbtqbsfkqqcrl
10-15 q: qqrqqmqqqqfwqfzqqxqq
3-5 r: ldtrrxrnqrhqnhkrv
9-10 n: qnkvnnfnznnnnjn
1-8 w: wwwrwwpxmwsswwzwzww
1-4 f: zfwtzx
1-8 w: wwwnnwfv
9-11 r: jrrfgrrrzdr
15-18 b: bbbbbbzbbbbbbbsgbb
16-19 t: sfgfffhscvpdrqtvsmh
7-8 k: kkkkkkrk
9-11 z: fszzzzzzszzzcz
1-14 k: lhkrkkkklkkkpkfkk
5-6 s: sssscs
11-13 j: jjjpnjjjjjkjjj
1-6 x: mxhjgxbt
9-11 t: xtltttttktg
4-12 z: zzkdzwzzzzzfzz
13-16 j: jjjqjjjcjjsjdjjjjj
13-14 h: bhhhhhhhhhvhhhhhh
6-7 k: vwllpkb
1-5 c: sbnmbhcjlczjrc
2-11 c: skrtgbzdklcxqrwr
16-17 r: rvnnjknhswckcbrmr
5-6 b: btbbbnbb
3-5 c: ccpcm
3-7 h: hhvhvbhfth
2-11 d: ddbddlddvdfdwxwxd
6-8 m: mwmmmmmmmmc
1-5 l: lgwrlpmnfnzlczkpflt
4-6 x: cgbncxtwsvjwtbjqxzz
6-13 h: tnhshhkhhhjsdhrbh
1-2 s: gpzrf
12-14 p: pxpzpppfpppppxpp
2-8 j: jddjjjjtjjqpj
3-13 v: vkvvvvvvvvvvdvvvvvv
4-16 b: bbbbbbbbbbbbbzbdb
5-6 b: bbbbbbb
2-4 v: vvvhv
13-14 w: wwwcwwwwwwwwtww
1-7 g: gdbgpncbdgk
13-18 g: ggggskgggcgggghgsvr
15-18 c: cckcccccccccccgccccr
4-6 l: klflll
17-18 g: gggzgggggggggggggg
1-3 m: kmmmmmm
5-10 s: qxstrsbxkssksc
16-18 r: rrrrrrrrjrrjrrrrrvrr
6-9 c: rgcscfjccvzgcccqc
2-5 m: mmvmp
1-11 z: zbsdnzstzsbzzlj
6-7 v: vvvvtvqvpv
11-12 x: xxxxxxqxxxfnx
4-15 h: hnthvnjhzhqhwvwhh
4-12 g: dggggrvvgmcldfgqbggj
11-12 l: lllllwllllvn
1-3 l: lpplz
5-6 v: vzndfwd
6-8 j: vxjjddjjjmjpjw
6-7 k: kkkkklkk
2-9 g: zgqmwlgfrsz
1-2 k: kkqk
2-13 h: clhmnhhwhpdhh
3-14 z: zzxzzzzzzzzzzg
9-10 v: vvvvvvvvpf
17-18 z: zzzzzzzzzzzzzzczgz
15-18 j: jjjjjjjjdjjjjjjjjx
2-7 w: zqfxwwwwww
4-11 r: qrcrrzrqnrhrn
9-10 q: jqctxwmccqqpcqqbllq
4-5 b: tbbbk
1-2 r: rsvmjrbprjjvdkcfk
9-11 v: vvvvvvvvvvv
1-4 c: ccbjccccc
7-8 l: llllllql
5-8 c: cncccccwc
3-4 d: kdzdkjdqkvhdz
6-7 j: cjjjpqj
11-16 t: ttttttttbttttttttt
5-17 v: vvgvqvxvsvvvbvvvvvvv
12-18 k: kkkgkkkkkskkkkkdkwk
1-7 p: ppqqpjp
1-13 v: fsvbwvvvmvtvv
8-10 q: qqmqqqqbqmvvq
14-16 m: mmmmmmmmmmmmmmmgm
2-5 r: prrrmr
6-12 j: jhjjjzjpjmjjvj
5-6 x: xxxxdx
4-5 n: nnnsnn
2-6 j: jjjjztj
3-8 j: tzjzbjbqqjlww
13-15 z: btzzwrzbzmdcdzz
1-2 j: ddjkbx
4-8 b: jbbkbqsblcbhprzqtb
3-5 b: bbkbb
6-8 f: fffffffff
2-4 l: lsprl
17-18 t: ttttttttttttttttth
1-4 p: pppf
13-18 m: mmmmmmmmmmhmsmmmmmmm
7-8 s: sssssssss
18-19 t: ttjtttttttttttttttjt
2-5 j: jjddt
6-12 r: trrnrcrnrrrr
6-7 h: rhhkhhthdsh
6-7 s: vpxmpdstfdv
9-10 p: ppppppppwpppp
2-4 h: hhhh
1-3 h: hhthhhhfhhhhh
4-5 k: dkbknt
7-10 d: kbdddddddsdd
11-16 s: ssswksjsssgsssssspt
5-8 b: vxlbbbzmbkktwrtlbt
2-8 h: hhmhvszx
6-8 g: ggzggggxgg
3-4 q: qqqp
4-9 v: vvfvqzbvvh
10-13 g: xggmgglfgxpsgggggg
1-8 b: bgsblbskxgkt
7-10 b: dbbqhftgblbbb
1-2 j: wjjgrdznbn
12-13 z: mzzjzzzzzzzgzzsz
4-9 m: psmmmmmbzmvmmm
8-9 n: nnnmnnnnpnnn
2-3 p: qpjhhgkp
6-7 h: phhhwhhmfh
2-4 b: bkrljb
11-12 c: crccbcccccccc
3-14 r: rrrrbrrhrrrrrzhr
5-6 c: ccrcdcwcc
1-17 k: kkkkkkkkkkkkkkkklkkk
4-7 k: kkkkkkvkk
3-4 w: rqwc
6-12 k: kkxkklkkkkkk
2-3 w: dpww
15-16 h: hhhhhhhhhhshhhwhh
2-6 x: gxxmthnbj
3-5 s: sbhsc
10-12 q: qfqqprqqrmqqq
9-11 f: hkpmjfgfrcfnfz
2-16 f: ffffffffffffnffq
4-5 f: fffcf
2-7 d: tdzqcdd
1-4 h: hnxz
16-17 g: gggggggtgggggggqx
2-4 n: nngcd
4-6 r: rrrkmf
5-6 g: ggghgggg
7-9 p: qkmpfzpptdjsbppcthpp
9-13 t: ttttttbtttttt
5-7 l: cldkllzgxldwlcdll
5-8 f: ffpqrftfsjd
6-13 t: tbtltkltttsjttkr
6-17 w: wtbwwpwwwhwcwtwzzww
2-8 x: nxsqbdmkqtx
2-5 s: fsrsvss
9-12 x: nxxxxxxxmxxxnx
1-16 j: jjlmjrgpnkgjjwhjhxt
6-10 k: kkxkkkkkpfkkl
3-9 l: lhzgllglllrtt
18-19 p: pppppsppppppppppppp
1-8 b: bbbbdbbwbbjkbbj
16-18 p: pppppppppspppptppgpt
1-5 w: wnmwff
3-4 v: vvvvm
1-16 j: jbhjjbjhwjjgjxjw
8-17 j: jjjjhjjjjjjjcjjjs
3-4 n: nnnn
17-18 t: tttttttttttttxttwtt
3-4 k: kbpkk
2-3 n: ndnn
9-13 m: mmmmmmzmwmmmm
1-10 d: djdddddldddddddd
9-13 v: vjvvvvvvfvjvv
13-14 m: mmmmmmmmmmmmmm
4-10 x: xnxczxxxxxx
17-18 h: hhhhhhhhhhhthhhhmhh
3-13 z: zzmzzzzzzzzzzz
3-6 w: wwtwwww
11-14 v: ghvvvvvvvvvlvkvvvsvd
2-9 r: qrdqvchhjgrpgj
9-10 w: wwwwrwwwww
3-5 c: xcgccc
6-7 z: zzzzzfz
16-18 b: bbbbbdbbbbbbbbbpbp
3-5 s: ssssw
3-4 z: zztzzzzzzz
7-8 j: jjjjjjpj
11-12 b: mbsjljhbbnpczlnbm
1-4 k: tkhk
9-10 j: jjjnjjjjjz
3-8 v: nvrbvvmrvhcs
1-5 z: szdcdjphttvnrd
2-7 m: zmmmmmhvqhpmmmmsmmv
7-8 t: tbtttttghcdptljtk
2-9 s: slssssssss
2-4 g: jgnn
3-8 s: ssksssss
6-10 t: bthxljrxhth
4-10 d: dddddddddqddddddddd
8-13 c: ccrjcccccqjcc
6-8 z: tlgdknkzxrghz
8-11 t: jttttmtbttdt
1-2 x: xhxx
3-4 c: cccj
9-10 v: vvsvvvvvvv
4-8 q: qqclqqqqtqqpzqj
7-9 w: wwwwrwnwj
1-3 w: cbwmzwwr
6-7 l: llllllz
1-8 h: rhzhhphhmhfnh
1-5 t: ktrtv
6-11 c: kfccccdcccvxwc
4-7 q: qrqqzcx
4-7 z: wcxzjrlhfbnczdj
7-14 k: mckkdnkrkpkknkdkckfz
1-6 v: vvvvvbv
2-6 p: gmpszppxppp
3-16 k: ggxkknwkkjkqskzktgk
15-17 z: zzxqmnclzxzfvznzb
3-6 x: xxxxxpxxx
17-19 q: stvktzjwzbrbfmbqjsq
4-6 b: bbbsbbb
9-10 p: spttdpplsppdprxrvpgm
4-5 w: wwwwn
10-16 r: grnjxrwrrrzdrpmjtrrr
14-15 q: qqkqqqqgqqtqqqrqhq
4-8 q: qqqqzkzsqq
10-16 m: mmmmmmmmmwnmmmmmmmmm
5-10 h: hhhhzhhhhhhh
5-11 p: mkpphppzhwqpgpsqcshz
2-4 l: nnllsl
2-8 q: bqjtjmfqsqgcjvgf
2-3 w: wwsw
12-16 s: lmsjpgzfldmrhrmf
4-6 n: gnnnnv
9-12 s: xmwssfsssssnssxwds
2-4 h: vzfh
1-2 n: ngdp
4-7 q: sqqnhqqsvqqq
5-6 k: zvkdkldkg
11-12 w: wwwwwwxwwwkw
7-11 p: hgbsfjpmbkz
1-4 v: rwqvv
4-6 s: pssssss
7-10 m: mlmmmmmmmrmmx
1-2 n: hnmqzsn
11-12 n: nnnrnnnnnnnbn
1-2 k: qbxhwswsxzkdsxcbtwrw
13-15 n: nnnsnnnnnnnntnc
17-20 n: nnnnnxtnnnnnvnndjnnn
2-17 n: npnnnnnnnnnnnnnnnnn
6-13 t: ttkrxzdkttltszskt
10-15 k: mkfllgkdnvjptdh
6-9 m: mmmmmjmmm
14-15 w: wwxwwnwwwwzwwkgqkwww
2-10 k: zmgrvrzlmkgcddcrxk
12-14 c: cccczccccccjcjcccc
11-15 m: mmmmdmmmmmmmmmqm
18-19 r: rrrrrrrrrbrrrrrrrxbr
6-10 b: hnbnbblvpd
10-12 x: pwpxxqnxxxxxxvzcxx
3-4 n: nnnpj
4-6 n: nnnwnnjn
3-4 k: kkmk
12-14 j: jmjjjjjcjjjlwjjdj
3-4 q: gqqxq
7-10 z: zzcztxzzzzzx
2-14 q: cqnqbvqsglczhb
3-6 r: mrrhrn
14-15 z: gzdzdszdkrfzzgpp
4-10 j: jjjjjjjjjbj
3-7 w: vrwwwwhwwkw
6-8 s: shswpbjss
2-4 h: ghvnhh
3-8 m: mmmmxmmvm
5-6 g: ggxgxg
1-2 v: vzvv
2-7 r: qgmgrxrgrgv
5-15 z: zzzzbzzzzzzzzzz
3-10 t: tttttdtttwtl
1-4 w: kwws
1-3 h: crxhhkhc
5-6 f: nfffnttvfcm
9-15 d: ddddpdqddmdjddz
7-8 c: mjfqkmclzphkcnjrg
4-7 l: lcblmnlpltgbnsjll
5-8 v: rvcvvvvbvv
3-4 b: kbblb
12-17 v: vvzvvvdrvvvvvctspvnz
4-9 d: dddsdddddddddsd
6-7 s: shvgwsspmsnr
5-10 k: dghtgjbkkk
1-5 m: mmmcsxm
1-3 q: bvqqk
7-9 c: wccsccxcfkvvkctzc
5-6 k: jdkkcqkkg
5-8 g: tgggqpzfgfg
19-20 t: ttttttttttttttttttth
1-9 n: dhmnnqnnnpnnr
4-7 w: fwmwwrz
1-3 p: qcnppb
1-14 f: jtrcqftxkxfmxffffhf
10-11 z: zzpzzzzzzkzzz
13-15 h: phhhfhhhhlhhbhhhh
10-12 t: tttttttttmtt
6-9 s: psssxsscssss
3-4 p: ppbgp
11-15 b: lpjbbbpbbbrhbbbb
9-10 c: cchccccccl
3-9 t: wtltcrnvtmgtf
10-13 g: rkgggkfvcgktrhx
16-18 k: kkkkkkkzkkkkkkkfkk
3-8 q: txxqqjbqqd
7-16 j: gjgxwjjwjwvhjkqvr
4-12 t: xttzrmdtjvttcn
3-5 c: lcvcczsjd
14-16 n: nnnnnnnrmnnnnnnpn
4-9 c: cccfrpclcc
13-14 l: klllllllllllll
2-5 l: rlxvflqllllvsm
9-10 h: rhbhhhhhrhh
3-4 p: pftpp
1-3 z: zwbjlzpwldx
12-16 s: sbqwfmsstlsqbsws
8-9 g: gtqggjqgn
4-14 w: twwtwwwwgvwwwwswpwr
14-15 x: xxxxxqxxvxxxpxhxxx
11-12 c: ccdccccxccclmcccc
8-10 w: wwwwwwwrwwwwwww
1-4 f: fffqfpffff
3-4 p: pppq
3-8 l: dglblkmlllklxqsl
2-4 k: wkskqwkccrtv
10-11 l: lllllllllsl
6-11 b: qkgjbcqqhbqxw
1-3 q: qvqpp
10-14 d: xzhdlcwkqqzzbdtf
14-15 f: ffffffffffffftq
7-8 q: qqqqfqqdrqqh
4-9 h: ljfhrhhmbr
11-13 r: rrrrwrrrrkrhh
7-10 z: zzzzzznkzb
3-5 n: kvtnn
1-3 g: ggng
5-8 g: gggggggg
2-9 c: csnczjctbcmcccc
11-12 n: jnnnnxfknnndnnfnr
1-5 d: vdmddddd
7-8 z: zzzrztzmz
6-8 z: zbzzsmzzjm
1-2 r: trrrcn
5-7 m: msmmxcm
12-13 h: hnvhztwhhpwhqkf
10-11 t: wprthmcttqtt
4-6 r: tttrssfrrbxjrzgr
3-5 r: zrsnr
8-12 z: zjqzzzxdzzzb
16-17 x: gxxtswfpzxxpxbvxq
4-5 h: hhhhg
19-20 f: ffffffffffffffffffrf
3-4 l: llbsq
7-15 k: knkkkkfkkkkskkklkkkk
3-6 q: qqpqqb
7-9 t: ctztttttpjvt
1-2 x: xmpx
10-12 c: cctccdcchzcppctq
6-7 s: lssnssxns
4-13 m: wmngjsmtmmcjmdmm
2-9 h: jhmdxgchltdgj
12-13 c: hcjcrrlsgcccn
7-10 t: tsbtzttzqj
18-19 c: sccccccccccccccccczc
3-4 g: ggghw
7-12 p: vdlpjjpvmrmpskp
8-10 v: hqwvvtvvtvvvvjv
2-4 k: nkgv
1-3 h: hhxmhn
11-13 d: ddddddddddcddd
7-19 g: ggggmgggggggggggbsmm
5-13 k: kbkkkkmkwblkdf
1-2 j: jjjzjjjjwjjjj
6-10 g: gfsggjgggnl
2-3 s: cskcs
3-11 m: mjvqhbhjgqmq
1-11 q: qdwqqqbqjmzmdhxl
2-12 k: kkkkkkjwkkkckkzr
9-12 v: vvvvvvvvsvvv
3-4 r: rjmxr
2-7 k: kkpvkkr
3-4 h: hnzhhhsvfbswzxkslt
3-4 n: qbnmhhnhdchbnnvk
1-8 v: vvvvvvvv
3-4 j: jjmjj
9-18 f: ffffffffzffffffffff
4-6 f: qgfjffbfj
1-3 m: mmmmmtmmzm
2-5 d: qdddf
4-5 w: wwswbkwjcw
5-9 g: jvhgwlllgvxrfg
1-2 p: fhvmh
15-20 m: mmkmmmmmcmmmmmmnncmc
13-16 l: llncvllllllllllglz
16-17 l: llblllllkllllllndlgl
5-8 s: ssstwvsts
1-2 d: rddddldxdsrtddd
6-7 d: dddkdpdddd
4-5 w: wcwgw
9-11 r: lrfsrhrxqrrnrjggr
1-9 w: pxpfwbmxwdgvbhzlt
11-14 q: lhnlmdssgvqqskr
8-13 x: vtcxxmxswxmxd
5-13 r: sbpdrpgbvdrrrx
1-5 m: bmmmm
1-2 m: fmmsrft
2-6 v: pvvrvb
6-7 s: sssssksf
3-4 c: zclc
11-17 q: qqqqqqtqgqqqqqqqmq
1-6 j: jjgcrlm
3-4 n: sfnn
12-13 p: bppppppppppmkp
6-7 q: dtgqtqqlqqqqsq
5-6 v: vvvvqvv
7-8 d: ddwddbjdd
11-16 m: mmmmmtmmmmmmmmmfm
18-19 v: vvvvvvvfvvvvvvvvvvr
1-2 j: jljjj
3-9 r: rrrzrnrsdrrr
7-10 w: twslbwxwbwwwwww
9-11 v: rpvvzvxvvvzvvv
3-5 d: zzvtdt
7-11 p: prldqxjtpnppx
1-10 z: lzzzbcfgzz
11-14 h: hhhhhshhhhhhmph
6-12 v: sfbvvwvvjvkvvvd
8-10 f: fffhfffffnc
7-8 g: gqjgfwfggghggh
8-9 x: zgxxxxmhxxxx
12-13 z: zzzzzmnbzzzzgzzzr
2-3 c: cvcsccfg
3-4 s: ssws
5-8 c: cccwcccp
4-6 c: ccccdlxcc
5-8 l: prlzlxcccl
1-4 g: qlng
8-12 c: ccccccckcccccccccc
2-8 d: ddpddqjhbbr
13-15 j: jjjjjjvjjjwjjjqjj
5-8 x: xxwxcxcnxxxxfx
4-6 t: dtfbctcgtzrtntw
5-12 r: rrkdrrrdrrrx
6-7 h: rhbghkhchjmbkhhm
7-9 z: zzdzzgzpz
4-5 v: lvnmq
1-6 w: wwwwwwjw
14-16 n: hpnnnnnnvnxnnnnlnn
18-20 r: ftrrzrsrrrgsrzhwrbrr
12-13 s: ssfbssssssssws
2-9 g: gfvcgzgjb
2-4 n: nntqtn
4-5 h: vqzhzhrxhh
4-5 g: ggqkg
1-2 x: xzkx
7-11 j: jjdjjmddlrjgjjjqzls
1-3 v: vvvctbv
4-7 s: fwmsssdss
10-11 p: pppppppppbppp
13-14 q: qqqqqqcqqnzqzqqqqqt
7-14 z: rhzzwqmzzzzxzzzzcgz
8-9 b: bgbsbbbbwbsbblbcr
7-8 h: hhhhhhghkh
1-2 g: ngct
13-15 f: fffffffffffvmfg
4-7 h: mdghhfs
12-14 z: xzjzzzzvzzzgzz
3-4 p: ppsp
18-19 q: wqkqxtkfhlmrxndwsqcc
5-14 p: ppppbppprnprwpwpp
3-4 j: jjjcjj
2-3 b: blbn
4-6 g: grggvcgg
2-4 h: hghhh
4-6 f: fffffm
2-4 n: qsdnxt
2-5 q: qqqqqq
9-12 w: whlqgwcrqxwwrvw
6-7 z: zzzzztqzz
7-10 l: slnzmdlslsrc
4-8 q: jqqqjqqltd
5-6 h: xjzbdbsfjfrxhxqlbbrt
6-12 w: wwwlbvwwwwwwww
2-5 c: zcpcf
4-5 h: hhhmh
16-17 h: hhhhhjhhhhhhhhhgh
12-13 f: fffffffffffmk
4-5 d: dddgd
4-10 p: xppvfpsgpphcpppml
3-5 w: wwtwwj
7-10 w: twwwwgtwjwjwww
5-10 z: zzzzzzzzzgzzz
13-14 t: sjxsttgttttbqtthtbd
6-8 c: ccccmdrcct
2-4 v: vcxm
3-7 k: dkkzfwzkn
4-7 v: cjrvvxtsvvvv
11-15 s: ssssssssssrssss
1-8 j: jskfjjjj
2-3 p: pgnpn
4-5 p: psplppc
1-3 n: nnnn
11-12 x: xxxxmxxxxxzxxdrqx
1-4 k: kpln
6-10 p: pphppppppkp
2-4 v: cgxvvxkzvs
6-7 m: mmmvbmmjsrmtzkddzmxm
5-9 s: xcshstsdslsxms
1-17 m: vmjmmmmmgmmmmmbmst
2-3 g: ghgg
5-6 k: kkkkmkh
5-6 c: lccfcccsgc
4-6 n: nncnbnmznngnj
8-11 j: ljffjmrjmjm
4-9 j: rqxjwfsrfzbxjjmnflj
3-6 s: zscszpss
3-4 d: qldtdht
15-17 x: xmxxxxxxxxxxxxdxx
1-4 m: mmmmmmm
2-9 v: vvvvnvzsvv
3-4 n: nndn
9-13 s: crxnbslshlbgsh
1-10 c: cczkccchfc
3-5 d: dddddwv
7-9 n: hqrhnxnzfnkqnvnnnng
3-4 c: cwcvfdc
6-8 l: llllllltl
4-6 q: qqqqqm
1-5 x: xhmxxxtwxdxkk
5-17 f: gffrffffmffcbmfffff
15-16 x: xxxxxxxxxxxxxxcl
3-7 z: nmjzzdzz
9-12 v: vzvxvxvwpvvvvvcvxpmv
4-6 w: wtwwwm
3-12 d: dddddzdddgdw
2-4 p: pqpk
2-4 g: pqqgbwqzsjtcrmg
3-5 d: xdhsdpndjhd
9-11 t: ttbtttttqtt
2-11 d: kddwtcwxgkclxcnfgm
1-4 v: hgvvfvjvz
4-5 s: ssssm
2-11 g: gmggvgggggn
3-6 c: ccrccvr
1-4 n: nznfnn
1-4 f: sfxffff
17-18 q: qqqqqqqqqqqqqqqxhq
2-5 l: zllhn
7-10 v: cvcvvvvvvqxbv
9-13 l: lllgllllllllql
3-11 g: mlgwrbcsdflzm
4-5 t: gtbtcfqrxfxtjptgpqr
5-8 d: gfdzjkvd
4-5 f: ftfff
15-17 p: pppppppppppkjpppft
1-3 d: tcdd
3-12 n: tnxnnbshnndnnhbn
5-8 q: pqlkptqqqcqbqrr
8-9 l: lllllkllb
10-13 j: rsfjlxjtfjrkxn
8-9 w: wmzvwwwwdwzwwt
12-14 w: wwwwwwwwwwwwwm
6-7 g: qwggfqgnvrggg
15-16 x: xxmxxqrlgnfxxsxr
4-8 n: gnnlnnlncnrnnqnwncd
8-11 k: kkkkpknzdkkck
4-5 m: mmmsm
3-4 n: nnxn
7-11 c: cckcdzcjldcwfcr
12-14 j: wxvjvpjjjpjkjj
1-13 h: fhhcfzhhhhhhhh
11-12 p: pppppwfpppspp
3-4 t: tktptt
1-6 n: nnnnnfnn
6-15 l: lllllmwlllllllll
5-6 q: qqqqqdqlqqq
4-8 j: bjjxhjjd
2-9 w: tdwpwdkcw
6-8 l: llllltbr
13-14 f: fffffffffffffj
4-11 z: wxzkzzzzzzzt
7-11 w: wwkvcfwfsrcw
4-9 b: bzbjgbbbb
17-18 k: kkkkkbmkdkmckkvbkk
5-6 j: ngffrjspcz
16-18 q: qqvqqqqqqqqqqqqhqqqb
12-15 s: sszszstsgsssssdssssq
5-6 d: dddddg
4-8 s: ssssvnss
16-19 g: lgzswgbfwghgggnglqg
8-9 t: tttttttltttt
14-20 b: bvbbjjbbbwttbbblbbbp
4-7 c: cxcdhmm
1-11 g: gkvjfgjlggpjb
1-2 w: whmwwcwqgw
6-16 p: lgwrlppdfpxbltmqlp
4-7 r: rwrrhhrqgrr
12-15 j: jjjjjjjjjtjnjjh
3-5 k: kkkkkkkk
7-9 p: wpxpphfpp
2-3 z: zfzz
2-3 k: nbsdwkqktssd
7-12 g: gggggpnpdssgwggx
6-8 r: frrrrjrr
1-7 l: llllllll
11-16 x: bxxsqxxxxxxktxxz
3-5 n: nwbknpnnvnr
8-9 t: qtttfvttqnttttmtttdv
3-4 d: dfgk
5-7 f: ffwffff
9-10 c: cccccccpgr
3-4 q: qqpq
1-2 k: kmwvdkzwxlkk
1-8 s: sssljrsmsx
12-13 r: rsrrrbrnrhrrhrprrrrn
4-16 w: kfqncxdmjlwkfjmwhw
9-13 l: llllllllpllllll
2-4 m: mlmmdbbqqmgkcffxw
2-12 j: jjjjpjjjjjjrj
9-11 x: qxxdxxxxxxqx
2-6 v: svcsfvrfpbxpmvtscqjg
2-12 c: dctwqfthcdbcsklb
1-2 c: zcfrlczcpxcm
2-8 s: nspkfsvbfsw
5-10 m: dxvwmqmngmzd
2-3 w: twsxwvwzw
5-10 c: cccccccpcxrc
8-16 j: jjjjjjjmjjjjjjjjjj
8-16 p: ppppsppdpphppdxp
16-18 t: tttttttttttttttttcs
11-13 j: jjjjhjjjjbjgjjj
14-15 d: ddddddddddddddwdd
1-15 s: psgssjszssbssdsgds
14-16 z: zzzzzzzzzzzzzrzqz
8-10 v: vvvpvvvvvg
4-5 z: zzkzf
3-9 g: ggggggggfg
1-4 n: ckwcnhz
7-9 w: ckwwwwjwq
5-12 q: qbqwcqbvvxbq
4-10 x: xvxxxghnrk
2-3 d: pdpmdkvsmccpnp
3-11 f: lffffjfmzqplsfzfl
9-10 h: hhhhhhhhhk
1-4 x: bxxxxxmxx
10-13 t: rnnglkrgbrrwtqjmlbn
5-17 v: zfmxkbtjpvvvqdxcvvnv
9-10 j: kjkzjlnjjjjjjjj
13-15 g: gggggggggggwxsg
2-7 l: llhrxjl
5-6 s: hfszgwczxtsp
1-10 v: dqqvhttqqv
10-13 z: zctbpzzzzzpzdznzz
6-10 p: mpplqpppfhhqptphp
2-5 w: wwgbw
1-4 b: sbbbbb
6-15 z: hpzlzzzzzpzzzgdzzlzn
2-4 r: rhfrdqrxsb
6-16 s: crrtqsjqfssssgsssc
17-18 h: hhhhhhhhhhhhhhhnrh
6-8 f: xpgdffbblxxl
2-4 h: wzfmhhl
5-6 k: jkkkhk
8-9 c: ccccccccc
16-17 t: tttwttdtttttttvkttt
9-10 f: fffffffffh
6-10 l: zxclbtlsjlbls
2-6 m: mmjmms
8-11 r: rrrrrrxtrrrsqr
1-11 v: gcvxfvdkvvs
9-12 c: xgcjrmscgjmjfsdxcp
10-11 g: gggggjggggdg
5-7 s: ssssprssm
2-3 c: nzccfjcdxc
9-13 k: mdhkkgkkkkxkkvrkkk
6-7 s: sssssbsssk
12-19 n: xtlfpnxflxwblnjsnxnq
3-4 t: tdtltttlp
2-4 g: gggg
11-12 k: kkkkkklkkmmk
2-6 r: rsrrrrrl
3-4 r: rrzq
12-14 l: lllllplllklmlrd
2-3 d: dkdd
1-2 t: vttt
7-14 l: lmdkltvllhsnllnl
6-7 s: scssxssrsqfsjrcgdsb
5-6 d: tndddgrv
1-3 t: jhvtckvptnp
14-15 g: ggggbggzqggggdvgg
2-5 t: tvttt
4-9 f: hfsmksgnfh
6-14 k: kkkkkkkkkkkkkskk
6-7 w: wwwwwwxwcc
5-9 n: bnsvnnnqtpncn
5-7 v: vvjvfvvv
7-8 d: ddddddxd
13-14 b: bbbbbbbbbbbblf
1-4 l: lllml
9-12 p: ppppgppgpppwpdp
4-11 p: rpjpprbztgkxx
4-7 g: ggggzgtg
2-3 j: ncjjk
14-15 v: vvvvvvvvvvvvvvfv
9-10 l: llxllllhlzlsb
13-14 p: ppnppppppppppz
5-11 j: jjjvhjkjjjjzj
14-20 b: dbbbbbbbbzbbbbbbbbgc
5-6 m: mmdzzjmm
3-4 t: ttft
5-6 m: mmmmrmpmmmm
15-17 v: qhjrfvvbvplvvvvvq
1-15 t: gctmcdxttttvvtt
4-5 v: pfvcvcvrvv
13-14 n: nnnnnnnnnbnnknn
7-9 h: hhhhhhhhh
1-2 f: fhffgj
1-12 b: bbbbbbbbdbbk
6-7 n: nnnnnng
13-18 f: fffffffffffffffffs
11-14 b: bbbbbbbbbbbvbfb
10-12 h: hhhhhhhhhwhq
7-8 w: wwcwqcwwwpwbww
1-5 m: fmmmjmm
14-15 v: vvvhvvvvvvvvvvf
12-17 b: bbvbbbsblwbbbbbxf
1-5 w: stwwj
6-10 j: jjjjjgjjjj
1-4 l: zvcjqgqrvvfndlj
5-7 s: tswsgws
1-13 v: zfwvvvvpvvvvmvvvvvjv
1-3 j: rjjvpkknmmjmxpqrmx
5-8 s: mxgsrsssbstb
5-14 q: qqqqqqmtjqqqqqqc
1-7 s: sswdxsnbkj
5-9 d: ldnbdmrtv
7-8 w: wwwwwwww
7-8 g: gxggggpg
8-12 r: rrrrrrrrrrrkrr
2-5 n: nnbnsmpml
2-3 g: gsggggggg
9-11 s: kssssssssxns
15-16 m: bhsxvbrjhfzmmflm
4-7 h: wmhhhhzh
2-13 g: khdgzvpxgrcvgc
5-13 n: wnnnnslnnnnnjt
3-7 t: ttsptkgttt
1-7 m: ffqtfmm
8-12 p: pplppppspjpppq
17-18 r: rrrprrrrgrrrrxrrrzrr
3-4 f: ffzff
10-11 x: xxxxxxxxxxw
10-11 b: bbhbbbbwbbbbbd
7-16 b: htbbxcbsbtjgxdvjcbc
9-12 g: gggxggggsgvgqg
13-15 l: dgllcqgtslfvkwlb
10-11 f: fffvfffffffff
2-6 d: ddqtnb
3-11 m: mmmmsvqmmmcxkmm
15-16 f: fffgffffffffkffqff
3-4 s: hvgssssb
4-5 s: jslss
10-19 v: vvvvvvvvnvvvvvvvvvg
1-3 c: cmcqkckzzsczn
2-3 j: jjhm
10-11 j: jjjjmvjjjxkjj
2-3 r: rqrrtztrbpk
6-7 d: dddddrd
6-16 n: dzqnnsnmssnjznnnnnv
7-11 f: ffqrffhfffftfffff
2-8 z: zzzzkzddzzb
2-7 j: nhjjjjjhjs
7-10 l: xlltwhllrd
10-12 w: nwrsqlwhqkcl
15-16 w: wwwwwwwwwwwwwwwl
11-12 h: hhhhhhhhphmh
1-6 v: czvvwkgbvmjxvvgv
3-14 p: pppppppppqpppxpppprp
2-6 d: ddqrdnddddddddnddd
8-18 j: gjghwxsjfpcfqmjxqjc
5-11 g: ftggkgggbvsggb
1-4 q: bqqqqqqqqqqz
1-12 x: bgxxxxxmxxxx
3-5 l: lllll
3-7 c: zwccrrnfw
3-4 q: sqdqsr
3-4 g: gggv
9-10 h: wnpkttckhh
3-4 t: ttgp
3-6 g: glcgtgg
5-6 w: wwxxnwmpgkppwnwwj
3-4 f: ffzf
5-7 z: zdzzfvv
4-6 p: ppmprgpmcdkcp
11-12 m: mmmmmmmmmmcm
2-7 z: zzzzwzz
7-8 m: mmmmmmms
4-15 z: zcsnzzfczzmczdzjdzz
6-7 k: rkrlklk
7-8 v: dtklkrqhv
4-5 x: wprlxxhxbjsfx
4-7 j: cvrjjbxxjfwjjjd
1-2 g: ggsb
5-7 k: kkrfgvkqxk
3-5 q: qqpqq
7-12 c: cccccxmncnvzbcc
2-6 h: mhlhgl
7-8 l: lllllzllbfl
1-6 f: xnfssk
12-13 d: dddddddddddgd
3-7 p: ppkppppg
8-11 j: mjfwjzfpjgjtnnqh
9-10 c: qtjcccccjcfclscc
10-12 b: bbbbbbpbbbbbcb
1-3 p: rfppppc
2-5 j: wjjbkbm
14-15 k: zkkkkkkkkkkkkvk
4-10 v: jkjslhtdvvtprslsr
4-10 s: sklrpnszsswls
8-11 k: dktkkkkkkkzkktq
10-16 v: rndbqtdxwtkvhvgvhkg
1-3 w: swwm
7-8 z: zzpzbzjzz
2-17 f: hfxrbqffmfdrzfzgsvmq
1-4 c: cqclc
5-10 x: xzxxxxxxkx
1-3 x: xdspcrljk
13-14 g: kwwbqcmwfwhrgzlg
7-10 z: xpsxjczspcflhbjk
6-12 m: sxgpgmbdmvksfpmqcjx
9-11 c: ccncctcfcvpccxc
9-11 t: ttxttttwttb
2-13 x: xxdvxmxxxnxxzx
17-18 n: nncnnnnnnnnnnnrnvn
5-12 j: jpjzjpjjjsphjtj
9-14 n: znnnnnnnnnnvsnnn
3-4 v: vfdvxwlv
2-18 w: mwfpnzwlvwmxgsprvhp
11-13 b: bblbbbbbbbcbbrlc
1-12 l: llllllrlhspdl
4-6 p: pphhpp
5-7 r: rffrwrrqzrzcv
7-10 z: hfzzzzzzzz
17-18 q: qqqqqqqqlqqqqqbqqqq
9-14 s: ssstsjssbsgsss
12-16 w: wwwwwwwwwwwwwwwgw
1-4 h: bhhh
1-2 g: ggggqggrn
10-12 p: dzpzvvwppphfpl
3-4 w: wnwp
2-17 k: pdkknkhkskhndkvkkgwk
10-13 w: wwwwwwwwzwwwnzw
5-6 t: crrgctktdmtttldhdlmt
9-11 h: hhhhhhhhthchhhhh
2-4 k: jktxzmhhmxjmtkkbphpk
6-9 g: ggggghggqg
1-5 j: xjjcj
1-5 p: xpwnp
1-11 q: qqqqjqhqqjf
8-16 p: pppppppnppkpppch
1-3 k: kkkk
4-11 s: sssbsslswss
6-10 s: sfkssshksrsq
2-4 v: mnvv
5-6 l: llllllllllll
3-5 n: nznnn
4-5 l: nllzwml
3-5 w: rwwqv
4-6 x: xxbxvwxdxgbxgx
10-16 w: wwwwswwwwwwwwwlwqw
10-12 d: dddddddddddfd
7-9 q: qwlqzqqsvqq
5-7 p: fpzpkplppp
4-11 n: xfnxfjhxvxnnzc
3-4 x: qfxx
18-19 g: gggqggdggggggggggmgg
13-15 c: cccccccccccczcc
11-12 v: qvvnvvvzcvhtvctvtb
3-15 d: dpdgmdnfsdbgdddbdmcd
9-13 j: jjjjcjjprjjjjj
3-9 t: qtvttxtxtngnhdt
12-13 d: ddddddddzdddcv
4-8 h: hhhhhhhbhh
2-3 x: xrxc
2-10 l: lmlllllllll
7-8 d: dddddddrdd
11-13 c: ccccccccccccd
1-3 p: pzppmvp
4-8 b: bjbbvbbzbbbbbqbxxf
4-5 p: hcprp
5-9 m: mmmmvmgmmmmj
2-8 z: zzfzxjfz
16-17 z: kzzrdzzzwzzzzzzznzzz
3-4 d: gddsd
1-9 m: mmkmxmmmjh
14-15 f: fffffffffffsfqff
10-11 w: wwwwwwwwwhw
5-6 q: nqcqqspqq
2-4 b: bbbj
8-9 l: llvnqlllwsll
6-7 t: wttttttt
9-10 n: nnhnnnnnjnn
1-2 g: gdgg
7-8 v: vmvvvvvxv
8-13 v: vvvvvvvwgvvvvx
6-7 m: smmfjfmscmpmmp
3-5 m: mmhbmm
3-4 t: tttft
5-12 l: xslklnmkpmbl
19-20 h: hhhhhhhhhhhhhhhhhhht
4-8 f: ffffffhlf
1-3 k: khkg
15-16 s: sssssssssssssssb
7-10 j: jzjjjjjjjw
5-7 w: bszqxhws
7-8 l: tknllgzl
10-12 g: gggggggggmggg
2-4 s: sgns
11-17 h: bqrhkhhhjhswbhzhkhh
8-15 d: gdddhdddddgjddddwdd
8-12 s: gssbjtdsssjtsw
1-3 p: pfppp
2-4 t: tttw
5-10 w: zzcwwwwwwkwwwqws
1-7 c: ccrmhdchwbr
7-11 g: xzgnggggrggrg`;


/***/ }),

/***/ "VId4":
/*!****************************************!*\
  !*** ./src/app/solution-code/day09.ts ***!
  \****************************************/
/*! exports provided: dayNinePartTwo, dayNineInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayNinePartTwo", function() { return dayNinePartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayNineInput", function() { return dayNineInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayNinePartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const numbers = fileReader.readLineByLine(Number);
    function isNumberSumOfAnyCombination(num, combinations) {
        for (let i = 0; i < combinations.length - 1; i++) {
            const iValue = combinations[i];
            for (let j = i + 1; j < combinations.length; j++) {
                const jValue = combinations[j];
                if (iValue + jValue === num)
                    return true;
            }
        }
        return false;
    }
    let weakness = undefined;
    for (let i = 25; i < numbers.length; i++) {
        if (!isNumberSumOfAnyCombination(numbers[i], numbers.slice(i - 25, i))) {
            weakness = numbers[i];
            break;
        }
    }
    if (!weakness)
        throw new Error('Weakness not found');
    let sum = 0;
    let summedNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
        if (sum === weakness) {
            const { min, max } = summedNumbers.reduce((prev, curr) => ({
                min: Math.min(prev.min, curr),
                max: Math.max(prev.max, curr),
            }), { min: Number.MAX_VALUE, max: Number.MIN_VALUE });
            console.log(min + max);
            break;
        }
        const theNumber = numbers[i];
        sum += theNumber;
        summedNumbers.push(theNumber);
        while (sum > weakness) {
            const [removedEntry] = summedNumbers.splice(0, 1);
            sum -= removedEntry;
        }
    }
    return sum;
}
const dayNineInput = `21
32
15
49
19
30
50
40
33
45
11
42
26
10
12
5
4
1
27
17
41
43
14
29
18
6
24
16
28
7
8
31
44
9
13
30
85
11
22
10
48
70
15
19
20
17
21
25
14
23
18
26
104
37
16
24
27
28
29
31
32
44
30
46
39
33
35
34
42
36
38
47
72
40
41
43
60
45
48
49
51
55
73
59
69
62
63
65
71
67
68
89
70
74
78
160
81
83
136
90
117
130
99
115
100
106
118
152
121
161
219
184
133
142
145
146
159
164
155
168
171
217
381
252
189
633
205
199
246
221
224
239
301
254
459
275
304
323
287
291
588
392
319
326
475
388
711
394
404
695
429
420
540
526
445
692
849
1066
529
562
566
578
675
1007
970
718
723
645
865
814
792
798
823
824
1247
874
946
971
1398
1597
1174
1140
1241
1091
1128
1211
1689
1738
1363
1437
2995
1368
1443
2263
1770
1926
1951
2145
1698
1820
1845
1917
2062
2219
2574
2826
2911
2302
2339
2491
4109
3066
3175
3934
2805
2811
3141
6079
3468
3543
3518
3665
4122
4219
3737
3762
3979
5967
4558
4641
4793
8418
6424
8328
5557
8101
5616
11065
7477
6279
5952
6609
11250
11072
7762
7859
10745
7499
7716
7741
15863
14138
10510
15027
10593
10350
11173
12231
11895
15239
14041
11568
12888
23068
12561
21995
14108
25772
15215
15240
15358
15457
22581
18066
29971
20860
24783
21523
26922
33563
21918
22741
30672
23463
24129
24456
26783
30455
26669
51494
29323
29348
30573
46129
68710
30815
38926
43601
51266
53434
44989
43441
44264
60020
46374
50132
49410
47592
53452
48585
77935
60163
55992
56017
58671
59921
81839
86518
96875
96255
78407
82367
91363
87705
89253
88430
89815
94396
98717
106537
143847
142705
96177
102037
104577
115938
114663
190573
118592
186944
138328
179068
160774
166837
171620
176958
170072
261297
176135
177683
234505
184211
193113
202714
411463
219240
293621
198214
206614
271414
285429
233255
256920
302803
299102
391327
382749
327611
341692
380397
346207
347755
353818
396923
361894
631428
504669
395827
400928
404828
431469
491835
439869
463534
490175
518684
532357
556022
669303
730504
903777
710360
675366
1088379
693962
701573
1361932
715712
840797
757721
796755
800655
805756
1019556
836297
995891
1363265
1551913
1179246
1205887
1051041
1257595
1433087
1344669
1606411
1369328
1395535
1376939
1409674
1417285
1502228
1473433
1832188
2302883
1554476
1597410
1636952
2182695
2042184
1887338
2547804
2588920
3209127
2230287
2256928
2446576
2764863
4618801
2713997
2746267
4421108
2974349
3998594
3524290
2890718
3389566
4299112
3939835
3151886
4763603
4144266
3819647
4070033
3929522
4117625
6363915
5021791
4970925
4487215
5160573
5192843
5460264
6971533
5604715
5636985
7377933
5865067
7221919
7453812
7081408
6541452
7091721
7269511
7639101
8951313
9935100
10470974
7999555
8416737
8604840
9458140
9509006
12241981
15638656
15663817
17556153
11097249
15146292
14491430
18886413
15080963
23096270
16476552
14361232
24962404
15269066
14730822
32601505
16416292
20658718
16604395
17021577
17457695
26366315
18062980
30810109
38734926
30932883
25458481
29222252
26243541
25588679
28852662
29092054
51591601
29442195
30837784
29630298
39323636
29999888
32290643
38116413
33020687
33437869
33625972
34062090
43387892
43046374
62462882
55030874
51047160
54680733
51702022
54810931
58074914
55096203
71614279
64275653
58534249
59072493
59442083
77449982
98077248
105858091
87386846
65311330
66458556
66646659
67063841
67688062
85109250
98198823
160661705
102749182
118160578
105727893
106798225
106512953
150420580
165765310
212371044
154450687
172496096
117606742
125531049
126088742
131769886
131957989
132375171
333157801
132999392
227120261
133015568
190837143
250622310
183308073
263964133
212240846
208477075
212526118
223334635
213311178
224119695
243137791
329847588
243695484
249376628
259088134
249564731
251619791
339399920
263727875
264333160
436645813
357135263
266014960
442456934
580469898
414171778
391785148
395548919
420717921
425837296
421788253
435860753
644837616
492702522
467257486
486833275
493072112
493260215
498941359
501184522
513292606
515347666
603733080
748920411
530348120
623150223
752684182
657800108
1070674912
787334067
805956926
812503069
816266840
887975407
847625549
857649006
1302681733
954090761
966198845
1801716310
979905387
992201574
1596545960
1014289025
1014477128
1043640726
1045695786
2024765673
1372070634
1188148228
1280950331
1830555865
1463757034
1700478476
1593290993
1618459995
1628769909
1972106961
1705274555
1811739767
1823847851
1946104232
1920289606
2035842300
2364272208
3215005955
2006490599
2611023088
2028766153
3293769469
2233844014
2326646117
2469098559
2560218862
2651905262
2744707365
4885749276
3057048027
3211750988
3222060902
3840505920
3334044464
5421320235
5945067552
5023490755
3949055759
3866393838
7052256908
8414166111
4035256752
4240334613
9002115579
4262610167
12842621499
4794062876
11562334441
4978551379
5029317421
10923618931
5396612627
5801755392
6268799015
9823380297
6556105366
7062566822
12081574329
7200438302
8106728451
9056673043
7815449597
7901650590
9772614255
8275591365
8297866919
9064574173
8502944780
9241161546
9291927588
10007868800
19064541843
10780306771
12794000976
10425930048
13672203992
11198368019
15307166753
13469237317
19282012631
13618672188
14263005124
16573458284
15015887899
28837156098
15717100187
21434121785
16404595370
16778536145
19496234938
35213335125
27771826303
17744106326
34080429742
21206236819
24044602236
21624298067
32965472255
30245662276
23895167365
31420483269
24667605336
28634560087
27087909505
29278893023
29980105311
48712207572
30732988086
31794424044
32121695557
37240341264
51414227096
33183131515
48978063122
51824536068
38950343145
39368404393
45250839055
49840796906
103238763164
45519465432
127133930529
56462029380
48562772701
50983076870
69034765308
64328250769
71162828437
56366802528
77641160989
76190684409
67973329350
82491180319
63916119601
78318747538
70423472779
95360262338
87513115846
88791140051
84201182200
109847716201
140106804010
140518935178
96502542302
113492794782
94082238133
139458238087
177821045551
99545849571
107349879398
120695053297
120282922129
124340131878
126790275307
189841059717
131889448951
148742220317
134339592380
185668626936
154624654979
157936588625
171714298046
172992322251
326338953025
191551061598
190584780435
326563265868
347777648342
193628087704
201432117531
214777291430
453129228332
206895728969
219828771700
227632801527
240977975426
541116244455
258679724258
339327000752
266229041331
334410847253
283081812697
288964247359
312561243604
397480509404
329650886671
344706620297
363577102686
382135842033
476709900401
426724500669
395060205235
546138737828
400523816673
553539219030
455755266856
541761536955
434528530496
636038180661
468610776953
499657699684
524908765589
547643971617
555193288690
549310854028
572046060056
709806313366
723492777855
642212130275
874190409805
798261663624
708283722983
745712944719
907044607622
856279083529
980667268324
1005066120884
835052347169
1421834381422
890283797352
903139307449
1047301671301
934186230180
1403923055146
1017921630981
1024566465273
1072552737206
1096954825645
1104504142718
2428489520419
1660133761256
1418090036349
1350495853258
1387925074994
1453996667702
1506545386607
1543336070152
1601992028248
1691331430698
1738191654618
1725336144521
1824470027532
2144256496946
2278208872346
1793423104801
1975692044655
1958752695453
2006738967386
3549806172053
2042488096254
2097119202479
2460477812200
2201458968363
2454999995976
2768585889607
4185813956721
2738420928252
4497488092230
2841921742696
2960542054309
4476612582870
4479667840709
7440209895018
3562661682150
3752175800254
3617893132333
6404583424846
4635344847497
4208197935749
4848660710082
3965491662839
4001240791707
4049227063640
7803707089054
6023139494350
4298578170842
5162001022672
4970044857970
5415542050285
6807413405535
5580342670948
8843542783246
6843162534403
5802463797005
7168739990058
7180554814483
8209438727456
7528153344989
7314837482404
7370068932587
7826091068082
7966732454546
14696893335047
15494885799535
8014718726479
11777458263505
8050467855347
8347805234482
9268623028812
11467318160900
10101041967847
10132045880642
10385586908255
22338048333938
17319090884159
12423505205351
12971203787063
12645626331408
12983018611488
14349294804541
14495392296887
14684906414991
19092295745909
15281569936950
15336801387133
28319819998621
15981451181025
35073746926934
16065186581826
20438223931830
18151509823194
16398273089829
18448847202329
25394708992414
23356790695318
20233087848489
24880979205142
22809092113606
25069131536759
25406523816839
25628644942896
25616830118471
36339809306806
30560578878713
28844687101428
29180298711878
53936650117092
34429097133042
58024985813306
33785648589462
32046637762851
90276459423898
32463459671655
50495484965180
34549782913023
34847120292158
36631360938318
41805637897647
47878223650365
50475655353598
43042179962095
51989390825484
59402478707933
57115769299610
51023353935310
54461517219899
54797128830349
59740877590591
59405265980141`;


/***/ }),

/***/ "a2md":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src!./src/app/visual-solution/visual-solution/code-execution.worker.ts ***!
  \**************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_app_solution_code__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/solution-code */ "mQLI");
/// <reference lib="webworker" />

function validateInputHasRightKeys(value) {
    return typeof value === 'object' && value !== null
        && 'input' in value && 'entry' in value;
}
function validateValidInput(value) {
    return validateInputHasRightKeys(value)
        && typeof value.input === 'string'
        && typeof value.entry === 'string';
}
addEventListener('message', ({ data }) => {
    if (!validateValidInput(data)) {
        postMessage({ success: false, message: 'Invalid format' });
        return;
    }
    const entry = src_app_solution_code__WEBPACK_IMPORTED_MODULE_0__["entries"].find(entry => entry.uniqueCode === data.entry);
    if (!entry) {
        postMessage({ success: false, message: 'Invalid solution code' });
        return;
    }
    try {
        const newResult = entry.solutionFn(data.input);
        postMessage({ success: true, message: newResult });
    }
    catch (err) {
        postMessage({ success: false, message: err.message });
    }
});


/***/ }),

/***/ "mQLI":
/*!****************************************!*\
  !*** ./src/app/solution-code/index.ts ***!
  \****************************************/
/*! exports provided: entries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return entries; });
/* harmony import */ var _day01__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./day01 */ "mnni");
/* harmony import */ var _day02__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./day02 */ "SwdP");
/* harmony import */ var _day03__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./day03 */ "F6Yz");
/* harmony import */ var _day04__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./day04 */ "ID08");
/* harmony import */ var _day05__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./day05 */ "83wl");
/* harmony import */ var _day06__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./day06 */ "NBYF");
/* harmony import */ var _day07__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./day07 */ "4lY0");
/* harmony import */ var _day08__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./day08 */ "xLc0");
/* harmony import */ var _day09__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./day09 */ "VId4");
/* harmony import */ var _day10__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./day10 */ "1gWZ");
/* harmony import */ var _day12__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./day12 */ "/nKI");
/* harmony import */ var _day14__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./day14 */ "/Laa");
/* harmony import */ var _day15__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./day15 */ "5fZc");
/* harmony import */ var _day16__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./day16 */ "5Skx");
/* harmony import */ var _day18__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./day18 */ "DMSO");
/* harmony import */ var _generated__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./generated */ "0VM2");
















const entries = [
    {
        description: 'Day 1: Report Repair (pt. 2)',
        uniqueCode: 'day-1-report-repair-pt2',
        solutionFn: _day01__WEBPACK_IMPORTED_MODULE_0__["dayOnePartTwo"],
        defaultInput: _day01__WEBPACK_IMPORTED_MODULE_0__["dayOneInput"],
        day: 1,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day01__dayOnePartTwo
    },
    {
        description: 'Day 2: Password Philosophy (pt. 2)',
        uniqueCode: 'day-2-password-philosophy-pt2',
        solutionFn: _day02__WEBPACK_IMPORTED_MODULE_1__["dayTwoPartTwo"],
        defaultInput: _day02__WEBPACK_IMPORTED_MODULE_1__["dayTwoInput"],
        day: 2,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day02__dayTwoPartTwo
    },
    {
        description: 'Day 3: Toboggan Trajectory (pt. 2)',
        uniqueCode: 'day-3-toboggan-trajectory-pt2',
        solutionFn: _day03__WEBPACK_IMPORTED_MODULE_2__["dayThreePartTwo"],
        defaultInput: _day03__WEBPACK_IMPORTED_MODULE_2__["dayThreeInput"],
        day: 3,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day03__dayThreePartTwo
    },
    {
        description: 'Day 4: Passport Processing',
        uniqueCode: 'day-4-passport-processing-pt2',
        solutionFn: _day04__WEBPACK_IMPORTED_MODULE_3__["dayFourPartTwo"],
        defaultInput: _day04__WEBPACK_IMPORTED_MODULE_3__["dayFourInput"],
        day: 4,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day04__dayFourPartTwo
    },
    {
        description: 'Day 5: Binary Boarding',
        uniqueCode: 'day-5-binary-boarding-pt2',
        solutionFn: _day05__WEBPACK_IMPORTED_MODULE_4__["dayFivePartTwo"],
        defaultInput: _day05__WEBPACK_IMPORTED_MODULE_4__["dayFiveInput"],
        day: 5,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day05__dayFivePartTwo
    },
    {
        description: 'Day 6: Custom Customs',
        uniqueCode: 'day-6-custom-customs-pt2',
        solutionFn: _day06__WEBPACK_IMPORTED_MODULE_5__["daySixPartTwo"],
        defaultInput: _day06__WEBPACK_IMPORTED_MODULE_5__["daySixInput"],
        day: 6,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day06__daySixPartTwo
    },
    {
        description: 'Day 7: Handy Haversacks',
        uniqueCode: 'day-7-handy-haversacks-pt2',
        solutionFn: _day07__WEBPACK_IMPORTED_MODULE_6__["daySevenPartTwo"],
        defaultInput: _day07__WEBPACK_IMPORTED_MODULE_6__["daySevenInput"],
        day: 7,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day07__daySevenPartTwo
    },
    {
        description: 'Day 8 Handheld Halting',
        uniqueCode: 'day-8-handheld-halting-pt2',
        solutionFn: _day08__WEBPACK_IMPORTED_MODULE_7__["dayEightPartTwo"],
        defaultInput: _day08__WEBPACK_IMPORTED_MODULE_7__["dayEightInput"],
        day: 8,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day08__dayEightPartTwo
    },
    {
        description: 'Day 9 Encoding Error',
        uniqueCode: 'day-9-encoding-error-pt2',
        solutionFn: _day09__WEBPACK_IMPORTED_MODULE_8__["dayNinePartTwo"],
        defaultInput: _day09__WEBPACK_IMPORTED_MODULE_8__["dayNineInput"],
        day: 9,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day09__dayNinePartTwo
    },
    {
        description: 'Day 10 Adapter Array',
        uniqueCode: 'day-10-adapter-array-pt2',
        solutionFn: _day10__WEBPACK_IMPORTED_MODULE_9__["dayTenPartTwo"],
        defaultInput: _day10__WEBPACK_IMPORTED_MODULE_9__["dayTenInput"],
        day: 10,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day10__dayTenPartTwo
    },
    {
        description: 'Day 12 Rain Risk',
        uniqueCode: 'day-12-rain-risk-pt2',
        solutionFn: _day12__WEBPACK_IMPORTED_MODULE_10__["dayTwelvePartTwo"],
        defaultInput: _day12__WEBPACK_IMPORTED_MODULE_10__["dayTwelveInput"],
        day: 12,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day12__dayTwelvePartTwo
    },
    {
        description: 'Day 14 Docking Data',
        uniqueCode: 'day-14-docking-data',
        solutionFn: _day14__WEBPACK_IMPORTED_MODULE_11__["dayFourteenPartTwo"],
        defaultInput: _day14__WEBPACK_IMPORTED_MODULE_11__["dayFourteenInput"],
        day: 14,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day14__dayFourteenPartTwo
    },
    {
        description: 'Day 15 Rambunctious Recitation (pt1)',
        uniqueCode: 'day-15-rambunctious-recitation-pt1',
        solutionFn: _day15__WEBPACK_IMPORTED_MODULE_12__["dayFifteenPartOne"],
        defaultInput: _day15__WEBPACK_IMPORTED_MODULE_12__["dayFifteenInput"],
        day: 15,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day15__dayFifteenPartOne
    },
    {
        description: 'Day 15 Rambunctious Recitation (pt2)',
        uniqueCode: 'day-15-rambunctious-recitation-pt2',
        solutionFn: _day15__WEBPACK_IMPORTED_MODULE_12__["dayFifteenPartTwo"],
        defaultInput: _day15__WEBPACK_IMPORTED_MODULE_12__["dayFifteenInput"],
        day: 15,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day15__dayFifteenPartTwo
    },
    {
        description: 'Day 16 Ticket Translation (pt1)',
        uniqueCode: 'day-16-ticket-translation-pt1',
        solutionFn: _day16__WEBPACK_IMPORTED_MODULE_13__["daySixteenPartOne"],
        defaultInput: _day16__WEBPACK_IMPORTED_MODULE_13__["daySixteenInput"],
        day: 16,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day16__daySixteenPartOne
    },
    {
        description: 'Day 16 Ticket Translation (pt2)',
        uniqueCode: 'day-16-ticket-translation-pt2',
        solutionFn: _day16__WEBPACK_IMPORTED_MODULE_13__["daySixteenPartTwo"],
        defaultInput: _day16__WEBPACK_IMPORTED_MODULE_13__["daySixteenInput"],
        day: 16,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day16__daySixteenPartTwo
    },
    // {
    //   description: 'Day 17 Conway Cubes (pt1)',
    //   uniqueCode: 'day-17-conway-cubes-pt1',
    //   solutionFn: daySeventeenPartOne,
    //   defaultInput: daySeventeenInput,
    //   day: 17,
    //   year: 2020,
    //   code: generated.day17__daySeventeenPartOne
    // },
    {
        description: 'Day 18 Operation Order (pt1)',
        uniqueCode: 'day-18-operation-order-pt1',
        solutionFn: _day18__WEBPACK_IMPORTED_MODULE_14__["dayEighteenPartOne"],
        defaultInput: _day18__WEBPACK_IMPORTED_MODULE_14__["dayEighteenInput"],
        day: 18,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day18__dayEighteenPartOne
    },
    {
        description: 'Day 18 Operation Order (pt2)',
        uniqueCode: 'day-18-operation-order-pt2',
        solutionFn: _day18__WEBPACK_IMPORTED_MODULE_14__["dayEighteenPartTwo"],
        defaultInput: _day18__WEBPACK_IMPORTED_MODULE_14__["dayEighteenInput"],
        day: 18,
        year: 2020,
        code: _generated__WEBPACK_IMPORTED_MODULE_15__["generated"].day18__dayEighteenPartTwo
    }
];


/***/ }),

/***/ "mnni":
/*!****************************************!*\
  !*** ./src/app/solution-code/day01.ts ***!
  \****************************************/
/*! exports provided: dayOnePartTwo, dayOneInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayOnePartTwo", function() { return dayOnePartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayOneInput", function() { return dayOneInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

/**
 * It might be possible to extract the source code using this regex
 * export function [a-zA-Z0-9]+\([^)]+\)[^{]+{[\s\S]+}
 */
function dayOnePartTwo(input) {
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const numbers = fileReader.readLineByLine(Number);
    numbers.sort();
    for (let i = 0; i < numbers.length; i++) {
        const left = numbers[i];
        for (let j = 0; j < numbers.length; j++) {
            const middle = numbers[j];
            const leftAndMiddle = left + middle;
            if (leftAndMiddle > 2020)
                continue;
            for (let k = 0; k < numbers.length; k++) {
                const right = numbers[k];
                const total = leftAndMiddle + right;
                if (total === 2020) {
                    console.log('Match found!', left, middle, right);
                    return left * middle * right;
                }
                if (total > 2020)
                    continue;
            }
        }
    }
    throw new Error('Solution to the problem was not found');
}
const dayOneInput = `2000
50
1984
1600
1736
1572
2010
1559
1999
1764
1808
1745
1343
1495
1860
1977
1981
1640
1966
1961
1978
1719
1930
535
1804
1535
1507
1284
1618
1991
1589
1593
1960
1953
1963
1697
1741
1823
1932
1789
1822
1972
1570
1651
1800
1514
726
1567
72
1987
1791
1842
1020
1541
1383
1505
2009
1925
13
1973
1599
1632
1905
1626
1554
1913
1890
1583
1513
1828
187
1616
1508
1524
1613
1648
32
1612
1992
1671
1955
1943
1936
1870
1629
1493
1770
1699
1990
1658
1592
1596
1888
1540
239
1677
1602
1877
1481
2004
1985
1829
1980
2008
1964
897
1843
1750
1969
1790
1989
1606
1484
1983
1986
1501
1511
1543
1869
1051
1810
1716
1633
1850
1500
1120
1849
1941
1403
1515
1915
1862
2002
1952
1893
1494
1610
1797
1908
1534
1979
2006
1971
1993
1432
1547
1488
1642
1982
1666
1856
1889
1691
1976
1962
2005
1611
1665
1816
1880
1896
1552
1809
1844
1553
1841
1785
1968
1491
1498
1995
1748
1533
1988
2001
1917
1788
1537
1659
1574
1724
1997
923
1476
1763
1817
1998
1848
1974
1830
1672
1861
1652
1551
1363
1645
1996
1965
1967
1778`;


/***/ }),

/***/ "uXjY":
/*!**********************************************!*\
  !*** ./src/app/solution-code/file-reader.ts ***!
  \**********************************************/
/*! exports provided: MyFileReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyFileReader", function() { return MyFileReader; });
class MyFileReader {
    constructor(input) {
        this._input = input.trim();
    }
    readLineByLine(lineMutatorFn) {
        const split = this._input.split(this.getSeperator());
        const filtered = split.filter(val => val.length > 0);
        if (lineMutatorFn) {
            return filtered.map(lineMutatorFn);
        }
        else {
            return filtered;
        }
    }
    readEntriesSeperatedByWhiteline(mutatorFn) {
        const filtered = this._input.split(this.getSeperator());
        const results = [];
        let tempResult = [];
        filtered.forEach(result => {
            if (result.length === 0) {
                if (tempResult.length > 0) {
                    results.push(tempResult);
                    tempResult = [];
                }
            }
            else {
                tempResult.push(result);
            }
        });
        if (tempResult.length > 0)
            results.push(tempResult);
        if (mutatorFn) {
            return results.map(mutatorFn);
        }
        return results;
    }
    getSeperator() {
        if (this._input.indexOf('\r') === -1) {
            return '\n';
        }
        else if (this._input.indexOf('\n') === -1) {
            return '\r';
        }
        else {
            return '\r\n';
        }
    }
}


/***/ }),

/***/ "xLc0":
/*!****************************************!*\
  !*** ./src/app/solution-code/day08.ts ***!
  \****************************************/
/*! exports provided: dayEightPartTwo, dayEightInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayEightPartTwo", function() { return dayEightPartTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayEightInput", function() { return dayEightInput; });
/* harmony import */ var _file_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-reader */ "uXjY");

function dayEightPartTwo(input) {
    class OperationContext {
        constructor() {
            this._accumulator = 0;
            this._instruction = 0;
            this._visitedInstructions = new Set();
        }
        get instruction() {
            return this._instruction;
        }
        get accumulator() {
            return this._accumulator;
        }
        moveNext() {
            this._instruction++;
        }
        accumlate(amount) {
            this._accumulator += amount;
            this.moveNext();
        }
        jump(amount) {
            this._instruction += amount;
        }
        hasVisitedCurrentInstructionBefore() {
            if (this._visitedInstructions.has(this._instruction)) {
                return true;
            }
            this._visitedInstructions.add(this._instruction);
            return false;
        }
    }
    class AccOperation {
        constructor(amount) {
            this.amount = amount;
        }
        perform(ctx) {
            ctx.accumlate(this.amount);
        }
    }
    class JmpOperation {
        constructor(amount) {
            this.amount = amount;
        }
        perform(ctx) {
            ctx.jump(this.amount);
        }
    }
    class NopOperation {
        constructor(amount) {
            this.amount = amount;
        }
        perform(ctx) {
            ctx.moveNext();
        }
    }
    const matchStatement = /([a-z]{3}) ([+-]\d+)/;
    const fileReader = new _file_reader__WEBPACK_IMPORTED_MODULE_0__["MyFileReader"](input);
    const operations = fileReader.readLineByLine((line) => {
        const [, op, amount] = line.match(matchStatement);
        const amountAsNum = Number(amount);
        switch (op) {
            case 'acc':
                return new AccOperation(amountAsNum);
            case 'jmp':
                return new JmpOperation(amountAsNum);
            case 'nop':
                return new NopOperation(amountAsNum);
            default:
                throw new Error(`Invalid operation\n${op}`);
        }
    });
    for (let i = 0; i < operations.length; i++) {
        const corruptedOperation = operations[i];
        if (corruptedOperation instanceof AccOperation)
            continue; // these are not corrupted
        const newOperationSet = [...operations];
        newOperationSet[i] =
            corruptedOperation instanceof NopOperation
                ? new JmpOperation(corruptedOperation.amount)
                : new NopOperation(corruptedOperation.amount);
        const ctx = new OperationContext();
        while (!ctx.hasVisitedCurrentInstructionBefore()) {
            const instructionNumber = ctx.instruction;
            if (instructionNumber === newOperationSet.length - 1) {
                // LAST INSTRUCTION REACHED!
                const instruction = newOperationSet[instructionNumber];
                instruction.perform(ctx);
                return ctx.accumulator;
            }
            if (instructionNumber >= newOperationSet.length)
                continue; // this program is invalid. We are past the last instruction.
            const instruction = newOperationSet[instructionNumber];
            instruction.perform(ctx);
        }
    }
    throw new Error('Result not found');
}
const dayEightInput = `acc +29
acc +0
acc +36
jmp +292
acc +11
acc +16
nop +280
nop +320
jmp +310
acc +15
jmp +76
acc +31
acc +6
acc +29
acc +35
jmp +524
acc +4
acc +12
jmp +162
acc +14
acc -10
jmp +312
acc +19
jmp +385
acc +46
acc +13
acc -19
jmp +366
jmp +56
acc -9
nop +74
jmp +357
acc +28
jmp +223
acc -12
jmp +292
nop +385
acc +45
jmp +255
jmp +337
nop +465
acc +43
jmp +555
acc +20
acc +23
acc +39
jmp -6
acc -4
jmp -39
acc +7
acc -13
acc +41
acc +4
jmp +80
jmp +1
jmp +484
acc -16
acc +2
acc +20
jmp +244
jmp +258
acc +27
acc -7
acc +40
nop +490
jmp +247
nop +363
acc +46
acc +27
acc -4
jmp +379
jmp +62
acc -15
acc +38
acc -4
acc +4
jmp +312
acc +37
jmp +271
acc +3
jmp +538
jmp +1
acc +33
jmp +99
jmp +107
jmp -38
jmp +359
jmp +1
acc +11
acc -3
jmp +109
acc +17
jmp +146
acc +34
acc -5
jmp +174
jmp +482
acc +43
acc +35
acc +8
acc +36
jmp -41
jmp +260
jmp -49
acc +30
nop -33
acc +49
acc +40
jmp +157
acc -11
acc -11
acc +21
acc +35
jmp +489
jmp +219
acc +33
acc +22
jmp +224
jmp +1
jmp +278
acc +0
acc +31
jmp +271
acc -19
acc +38
acc -15
acc +0
jmp +81
acc +7
acc +50
nop +55
nop +2
jmp +195
acc -18
acc +14
jmp +1
jmp -57
acc -17
nop +495
jmp -21
jmp +1
acc +39
acc +35
acc +27
jmp +301
acc +6
acc +11
acc -10
jmp +1
jmp +56
acc +38
jmp +333
acc +26
acc -15
acc +32
acc -9
jmp +412
acc -17
acc +9
jmp +110
nop +298
acc +4
acc +25
acc +0
jmp -136
acc +24
jmp +418
acc -2
acc +38
jmp +92
acc +5
acc +22
acc -4
acc -12
jmp +241
acc +19
nop -6
acc -11
acc +24
jmp +236
jmp +106
jmp +343
jmp -17
acc +5
jmp +143
nop +354
acc +20
acc -11
jmp +63
nop +252
jmp +96
acc -11
acc +35
nop +409
acc +2
jmp +83
acc +0
acc -1
jmp +299
acc +46
jmp +426
acc +8
acc +50
acc +33
jmp +384
nop -20
jmp -152
jmp +283
nop -161
nop -76
acc +34
nop -202
jmp -98
acc +11
jmp +194
acc +12
acc +32
acc -18
acc +4
jmp +202
acc -12
acc +43
acc -11
jmp +70
acc +8
acc -5
acc +9
jmp -187
acc +49
acc +42
acc +10
jmp +274
jmp -216
acc -11
acc -8
acc +49
nop -56
jmp -197
nop -33
nop -167
jmp -174
acc +41
acc +19
acc +13
jmp +334
acc +48
acc +37
acc +35
jmp +323
jmp +1
jmp -184
nop +76
acc +47
acc +5
jmp -150
jmp +133
acc -1
jmp +197
nop +175
acc +28
jmp +328
jmp +209
nop -190
jmp +1
jmp +181
acc +33
acc +34
jmp +345
jmp -118
acc +40
acc +36
nop +32
jmp +261
acc +38
acc +1
acc -19
acc +48
jmp +320
acc +32
acc -7
acc +34
jmp +64
acc +6
acc +3
acc -11
jmp +293
acc +49
acc +23
acc +46
jmp +231
jmp +1
acc -17
jmp +35
jmp -78
jmp +82
acc +31
nop +31
acc +35
acc +42
jmp -208
acc +2
acc -16
jmp +139
nop -170
acc -4
acc +22
acc +9
jmp +295
nop -248
acc +33
acc +32
jmp +186
acc -11
jmp +151
acc +15
acc -7
acc +20
jmp -215
acc +43
acc +12
acc +6
acc +5
jmp +225
acc +15
jmp +1
nop +263
jmp -317
acc +34
jmp +1
jmp -275
acc -15
acc -12
jmp +165
nop -254
acc +12
nop +277
jmp +105
acc +35
jmp +1
acc +34
jmp +93
acc +9
jmp -282
acc +43
jmp -335
acc +21
jmp -114
acc +30
jmp -246
acc -17
acc +10
nop -211
nop +202
jmp +76
acc +34
acc +23
acc +9
acc +48
jmp -208
jmp -241
acc +37
jmp +97
acc +10
acc +47
nop -292
acc -13
jmp +27
acc -18
nop -56
jmp +33
acc +7
jmp -12
acc -11
acc -2
acc +13
jmp -328
acc +21
acc +30
jmp -208
acc -7
jmp -87
acc +41
nop +76
acc +22
jmp +222
acc +48
acc +4
jmp +225
jmp +200
acc -14
acc -12
nop -79
jmp +192
acc +41
acc +3
jmp -355
jmp -292
acc -18
jmp -174
acc +44
acc +23
jmp -163
acc +5
nop -125
nop -7
acc +41
jmp -266
jmp +90
acc +5
jmp +213
acc +10
acc -11
nop -403
jmp +1
jmp -386
acc -18
acc +9
nop +107
acc +0
jmp -383
jmp +104
acc +30
acc -3
nop -208
acc -15
jmp +211
acc -12
acc +18
jmp -392
acc +25
acc +30
jmp -170
jmp -282
acc +38
acc -16
jmp -108
acc +29
acc +31
acc +29
acc +32
jmp -258
acc -16
jmp -40
acc +41
jmp -365
acc +17
acc +20
jmp -77
jmp -55
acc +3
acc +28
nop -227
jmp +116
jmp +165
acc +16
jmp -74
acc -4
jmp -275
acc +28
jmp -254
acc +13
acc -12
acc -16
jmp -5
acc +17
nop -369
nop -375
nop +66
jmp -173
jmp -40
jmp -448
acc -10
nop -332
acc +39
acc -8
jmp +64
acc -19
acc +14
jmp -376
acc +20
acc +25
acc +11
acc +29
jmp -392
acc +33
acc +28
nop -241
acc -6
jmp +2
jmp -410
acc +15
nop -351
jmp -254
acc -2
acc +15
acc +11
jmp -103
acc +29
acc +7
jmp +21
acc +20
acc +3
acc -4
acc +31
jmp -7
acc -1
jmp +1
jmp -158
acc +11
acc -8
jmp +123
acc -9
acc +42
acc +6
acc -18
jmp -483
nop -507
acc +37
acc -10
jmp -61
jmp +98
acc +38
acc +36
jmp -358
nop -231
acc +23
acc +49
jmp -151
acc +48
acc +2
acc +19
acc +34
jmp -8
acc -14
acc -16
jmp -439
acc -7
acc -14
jmp -466
acc +1
nop -254
acc +11
jmp -72
acc +33
acc +11
acc +40
jmp -428
acc +26
acc +8
acc +19
jmp -305
nop +71
acc +3
jmp -457
acc -6
acc +36
jmp +77
acc +11
nop +68
jmp -69
acc +7
acc -8
acc +50
jmp -516
acc +11
acc +46
acc +4
jmp -179
jmp -265
nop -64
jmp +63
acc +27
nop -340
jmp -62
acc +15
acc +42
acc -9
jmp -549
acc +3
acc -10
acc +28
jmp -376
jmp +1
jmp -78
jmp -87
acc +34
acc -17
jmp -275
acc +50
acc +17
acc +39
jmp -133
nop -331
acc +33
acc +38
acc +25
jmp -215
acc +0
acc -9
jmp -258
acc +25
jmp -81
jmp -574
acc +37
acc +48
jmp -327
acc +34
nop -493
acc +42
jmp -459
jmp +1
jmp -135
jmp -489
acc +33
acc +19
acc +17
acc +7
jmp -106
nop -164
jmp -462
acc +27
jmp -612
acc +15
jmp -438
acc +35
jmp -171
acc +10
acc +4
acc +34
jmp -496
nop -4
acc +16
jmp -541
acc +13
jmp -201
jmp -551
acc +40
acc +9
acc +0
acc +33
jmp +1`;


/***/ })

/******/ });
//# sourceMappingURL=0.worker.js.map