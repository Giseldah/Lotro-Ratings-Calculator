// Created by Giseldah

var DblCalcDev = 0.00000001;

var PercTags = [
	'crithit',
	'devhit',
	'critmagn',
	'finesse',
	'phydmg',
	'tacdmg',
	'outheal',
	'resist',
	'critdef',
	'inheal',
	'block',
	'partblock',
	'partblockmit',
	'parry',
	'partparry',
	'partparrymit',
	'evade',
	'partevade',
	'partevademit',
	'phymit',
	'ofmit',
	'tacmit'
];

var PercGroups = {
	crithit: [
		'devhit',
		'critmagn'
	],
	tacdmg: [
		'outheal'
	],
	block: [
		'partblock',
		'partblockmit'
	],
	parry: [
		'partparry',
		'partparrymit'
	],
	evade: [
		'partevade',
		'partevademit'
	],
	phymit: [
		'ofmit'
	]
};

var PenRatings = {
	resist: 'resistpen',
	block: 'bpepen',
	partblock: 'bpepen',
	partblockmit: 'bpepen',
	parry: 'bpepen',
	partparry: 'bpepen',
	partparrymit: 'bpepen',
	evade: 'bpepen',
	partevade: 'bpepen',
	partevademit: 'bpepen',
	phymit: 'armourpen',
	ofmit: 'armourpenlow',
	tacmit: 'armourpenlow'
};

var PenChoices = [
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0},
	{armourpen: 0, armourpenlow: 0, bpepen: 0, resistpen: 0}
];

var PenTitles = [];

var PlayerClasses = [
	'beorning',
	'burglar',
	'captain',
	'champion',
	'guardian',
	'hunter',
	'loremaster',
	'minstrel',
	'runekeeper',
	'warden'
];

var ArmourTypes = [
	'',
	'light',
	'medium',
	'heavy'
];

var DiffColorNeg = 'rgba(255, 170, 170, 0.3)';
var DiffColorZero = '';
var DiffColorPos = 'rgba(170, 170, 255, 0.35)';

var LevelCap = 999;
var PlayerLvl = 130;
var PlayerClass = 0;
var PenChoice = 0;
var ArmourType = 3;
var CanBlock = true;
var GraphPerc = 0;

window.onload = function() {
	PenChoices.forEach(InitPenTitle);
	function InitPenTitle(pc,i) {
		PenTitles.push(document.getElementById('pen-sel-'+i).getAttribute('title'));
	}
	LevelCap = CalcStat('LevelCap',0);
	PlayerLvl = LevelCap;
	ChangeClass();
	ChangeLevel();
	ChangePen();
	PercTags.forEach(InitPerc);
	function InitPerc(ps) {
		if (typeof PercGroups[ps] !== 'undefined') {
			ProcessUnlockedBtn(document.getElementById(ps+'unlockedbtn'));
		}
		document.getElementById(ps+'currrat').value = '0';
		UpdateCurrPerc(ps);
		document.getElementById(ps+'targperc').value = '999';
		CorrectTargPerc(ps);
		UpdateTargRat(ps);
		UpdateRatDiff(ps);
	}
	InitGraph();
	document.getElementById('cs-version').innerHTML = 'v'+CalcStat('-Version',0);
}

function ProcessLockedBtn(lockedbtn) {
    var ps = lockedbtn.id.replace('lockedbtn','');
	lockedbtn.style.display = 'none';
	document.getElementById(ps+'unlockedbtn').style.display = 'block';
	PercGroups[ps].forEach(EnableCurrRat);
	function EnableCurrRat(pss) {
		document.getElementById(pss+'currrat').disabled = false;
		UpdatePerc(pss);
	}
}

function ProcessUnlockedBtn(unlockedbtn) {
    var ps = unlockedbtn.id.replace('unlockedbtn','');
	unlockedbtn.style.display = 'none';
	document.getElementById(ps+'lockedbtn').style.display = 'block';
	PercGroups[ps].forEach(DisableCurrRat);
	function DisableCurrRat(pss) {
		document.getElementById(pss+'currrat').disabled = true;
		document.getElementById(pss+'currrat').value = document.getElementById(ps+'currrat').value;
		UpdatePerc(pss);
	}
}

function ProcessCurrRat(currrat) {
    var ps = currrat.id.replace('currrat','');
	CorrectCurrRat(ps);
	UpdateCurrPerc(ps);
	UpdateRatDiff(ps);
	if (typeof PercGroups[ps] !== 'undefined') {
		var lb = document.getElementById(ps+'lockedbtn');
		if (lb.style.display != 'none') {
			PercGroups[ps].forEach(CopyCurrRat);
			function CopyCurrRat(pss) {
				document.getElementById(pss+'currrat').value = currrat.value;
				UpdateCurrPerc(pss);
				UpdateRatDiff(pss);
				UpdateGraph(pss);
			}
		}
	}
	UpdateGraph(ps);
}

function CorrectCurrRat(ps) {
	var currrat = document.getElementById(ps+'currrat');
	if (!currrat.disabled) {
		var s = currrat.value.trim();
		var n = Number(s);
		n = ((isNaN(n)) ? 0 : Math.max(Math.round(n+DblCalcDev),0));
		s = n.toString();
		if (s != currrat.value) currrat.value = s;
	}
}

function UpdateCurrPerc(ps) {
	var currperc = document.getElementById(ps+'currperc');
	if (!currperc.disabled) {
		var currrat = document.getElementById(ps+'currrat');
		var csps = ReplaceArmourType(ps);
		var pb = CalcStat(csps+'PBonus',PlayerLvl);
		var pen = 0;
		var pr = PenRatings[ps];
		if (typeof pr !== 'undefined') {
			pen = PenChoices[PenChoice][pr];
		}
		var p = (CalcStat(csps+'PRatP',PlayerLvl,Number(currrat.value)+pen)+0.0002+pb+DblCalcDev).toFixed(1).toString();
		currperc.innerHTML = p+((p.includes('.')) ? '%' : '.0%');
	}
}

function ProcessTargPerc(targperc) {
    var ps = targperc.id.replace('targperc','');
	CorrectTargPerc(ps);
	UpdateTargRat(ps);
	UpdateRatDiff(ps);
	UpdateGraph(ps);
}

function CorrectTargPerc(ps) {
	var targperc = document.getElementById(ps+'targperc');
	if (!targperc.disabled) {
		var csps = ReplaceArmourType(ps);
		var pb = CalcStat(csps+'PBonus',PlayerLvl);
		var s = targperc.value.trim().replace('%','');
		var n = Number(s);
		n = ((isNaN(n)) ? pb : Math.min(Math.max(n.toFixed(1),pb),(CalcStat(csps+'PratPCap',PlayerLvl)+pb+DblCalcDev).toFixed(1)));
		s = n.toString();
		s = s+((s.includes('.')) ? '%' : '.0%');
		if (s != targperc.value) targperc.value = s;
	}
}

function UpdateTargRat(ps) {
	var targrat = document.getElementById(ps+'targrat');
	if (!targrat.disabled) {
		var targperc = document.getElementById(ps+'targperc');
		var csps = ReplaceArmourType(ps);
		var pb = CalcStat(csps+'PBonus',PlayerLvl);
		var pen = 0;
		var pr = PenRatings[ps];
		if (typeof pr !== 'undefined') {
			pen = PenChoices[PenChoice][pr];
		}
		var r = Math.ceil(CalcStat(csps+'PPRat',PlayerLvl,Number(targperc.value.replace('%',''))-pb)-pen-DblCalcDev);
		targrat.innerHTML = r;
	}
}

function UpdateRatDiff(ps) {
	var ratdiff = document.getElementById(ps+'ratdiff');
	if (!ratdiff.disabled) {
		var currrat = document.getElementById(ps+'currrat');
		var targrat = document.getElementById(ps+'targrat');
		var diff = Number(currrat.value)-Number(targrat.innerHTML);
		ratdiff.innerHTML = diff;
		ratdiff.style.backgroundColor = ((diff == 0) ? DiffColorZero : ((diff < 0) ? DiffColorNeg : DiffColorPos));
	}
}

function ReplaceArmourType(ps) {
	return ((ps == 'phymit' || ps == 'ofmit' || ps == 'tacmit') ? 'Mit'+ArmourTypes[ArmourType] : ps);
}

function MakeSelection(sel) {
	var popup = document.getElementById('popup');
	var pusel = document.getElementById('pu-sel-'+sel);
	if (popup.hidden || (!popup.hidden && pusel.hidden)) {
		popup.hidden = true;
		document.getElementById('pu-sel-class').hidden = true;
		document.getElementById('pu-sel-level').hidden = true;
		document.getElementById('pu-sel-pen').hidden = true;
		document.getElementById('pu-sel-graph').hidden = true;
		pusel.hidden = false;
		if (sel == 'class') {
			popup.style.left = (Number(document.getElementById('calc').offsetLeft)+62).toString()+'px';
			popup.style.top = (Number(document.getElementById('calc').offsetTop)+67).toString()+'px';
			popup.hidden = false;
		} else if (sel == 'level') {
			popup.style.left = (Number(document.getElementById('calc').offsetLeft)+68).toString()+'px';
			popup.style.top = (Number(document.getElementById('calc').offsetTop)+67).toString()+'px';
			popup.hidden = false;
			document.getElementById('level-sel-range').min = 1;
			document.getElementById('level-sel-range').max = LevelCap;
			document.getElementById('level-sel-range').value = PlayerLvl;
		} else if (sel == 'pen') {
			popup.style.left = (Number(document.getElementById('calc').offsetLeft)+367).toString()+'px';
			popup.style.top = (Number(document.getElementById('calc').offsetTop)+67).toString()+'px';
			popup.hidden = false;
			popup.style.left = (621-Number(popup.offsetWidth)).toString()+'px';
		} else if (sel == 'graph') {
			popup.style.left = (Number(document.getElementById('graph').offsetLeft)+62).toString()+'px';
			popup.style.top = (Number(document.getElementById('graph').offsetTop)+67).toString()+'px';
			popup.hidden = false;
		}
	} else {
		popup.hidden = true;
		pusel.hidden = true;
	}
}

function SelectClass(el) {
	PlayerClass = Number(el.id.replace('class-sel-',''));
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-class').hidden = true;
	ChangeClass();
	PercTags.forEach(UpdatePerc);
}

function SelectLevel(el) {
	PlayerLvl = Number(el.value);
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-level').hidden = true;
	ChangeLevel();
	PercTags.forEach(UpdatePerc);
}

function LvlRangeUpdate(el) {
	if (!document.getElementById('popup').hidden) 
		document.getElementById('level-number').innerHTML = el.value;
}

function SelectPen(el) {
	PenChoice = Number(el.id.replace('pen-sel-',''));
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-pen').hidden = true;
	ChangePen();
	PercTags.forEach(UpdatePerc);
}

function SelectGraph(el) {
	GraphPerc = Number(el.id.replace('graph-sel-',''));
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-graph').hidden = true;
	ChangeGraph();
}

function ChangeClass() {
	document.getElementById('class-symb').setAttribute('src',document.getElementById('class-sel-img-'+PlayerClass).getAttribute('src'));
	document.getElementById('class-name').innerHTML = document.getElementById('class-sel-desc-'+PlayerClass).innerHTML;
	ArmourType = CalcStat(PlayerClasses[PlayerClass]+'CDArmourType',PlayerLvl);
	var OldCanBlock = CanBlock;
	CanBlock = (CalcStat(PlayerClasses[PlayerClass]+'CDCanBlock',PlayerLvl) > 0);
	if (OldCanBlock != CanBlock) {
		if (CanBlock) 
			EnablePercGroup('block');
		else
			DisablePercGroup('block');
	}
}

function ChangeLevel() {
	document.getElementById('level-number').innerHTML = PlayerLvl.toString();
	ArmourType = CalcStat(PlayerClasses[PlayerClass]+'CDArmourType',PlayerLvl);
	var OldCanBlock = CanBlock;
	CanBlock = (CalcStat(PlayerClasses[PlayerClass]+'CDCanBlock',PlayerLvl) > 0);
	if (OldCanBlock != CanBlock) {
		if (CanBlock) 
			EnablePercGroup('block');
		else
			DisablePercGroup('block');
	}
	PenChoices[1].armourpen = CalcStat('TPenArmour',PlayerLvl,2);
	PenChoices[1].armourpenlow = PenChoices[1].armourpen; ///5;
	PenChoices[1].bpepen = CalcStat('TPenBPE',PlayerLvl,2);
	PenChoices[1].resistpen = CalcStat('TPenResist',PlayerLvl,2);
	PenChoices[2].armourpen = CalcStat('TPenArmour',PlayerLvl,3);
	PenChoices[2].armourpenlow = PenChoices[2].armourpen; ///5;
	PenChoices[2].bpepen = CalcStat('TPenBPE',PlayerLvl,3);
	PenChoices[2].resistpen = CalcStat('TPenResist',PlayerLvl,3);
	PenChoices[3].armourpen = CalcStat('TPenArmour',54,2);
	PenChoices[3].armourpenlow = PenChoices[3].armourpen; ///5;
	PenChoices[3].bpepen = CalcStat('TPenBPE',54,2);
	PenChoices[3].resistpen = CalcStat('TPenResist',54,2);
	PenChoices[4].armourpen = CalcStat('TPenArmour',54,3);
	PenChoices[4].armourpenlow = PenChoices[4].armourpen; ///5;
	PenChoices[4].bpepen = CalcStat('TPenBPE',54,3);
	PenChoices[4].resistpen = CalcStat('TPenResist',54,3);
	PenChoices[5].armourpen = CalcStat('TPenArmour',78,2);
	PenChoices[5].armourpenlow = PenChoices[5].armourpen; ///5;
	PenChoices[5].bpepen = CalcStat('TPenBPE',78,2);
	PenChoices[5].resistpen = CalcStat('TPenResist',78,2);
	PenChoices[6].armourpen = CalcStat('TPenArmour',108,2);
	PenChoices[6].armourpenlow = PenChoices[6].armourpen; ///5;
	PenChoices[6].bpepen = CalcStat('TPenBPE',108,2);
	PenChoices[6].resistpen = CalcStat('TPenResist',108,2);
	PenChoices[7].armourpen = CalcStat('T2PenArmour',115);
	PenChoices[7].armourpenlow = PenChoices[7].armourpen; ///5;
	PenChoices[7].bpepen = CalcStat('T2PenBPE',115);
	PenChoices[7].resistpen = CalcStat('T2PenResist',115);
	PenChoices[8].armourpen = CalcStat('T2PenArmour',120);
	PenChoices[8].armourpenlow = PenChoices[8].armourpen; ///5;
	PenChoices[8].bpepen = CalcStat('T2PenBPE',120);
	PenChoices[8].resistpen = CalcStat('T2PenResist',120);
	PenTitles.forEach(SetPenTitle);
	function SetPenTitle(pt,i) {
		document.getElementById('pen-sel-'+i).setAttribute('title',
			pt.replace(/#bpepen/g,Math.round(PenChoices[i].bpepen+DblCalcDev).toString()).replace(/#resistpen/g,Math.round(PenChoices[i].resistpen+DblCalcDev).toString()).replace(/#armourpen/g,Math.round(PenChoices[i].armourpen+DblCalcDev).toString()));
	}
}

function ChangePen() {
	document.getElementById('pen-desc').innerHTML = document.getElementById('pen-sel-shortdesc-'+PenChoice).innerHTML;
	document.getElementById('pen-slot').setAttribute('src',document.getElementById('pen-sel-img-'+PenChoice).getAttribute('src'));
}

function ChangeGraph() {
	document.getElementById('perc-deco').setAttribute('src',document.getElementById('graph-sel-img-'+GraphPerc).getAttribute('src'));
	document.getElementById('perc-name').innerHTML = document.getElementById('graph-sel-desc-'+GraphPerc).innerHTML;
	graphconfig.options.title.text = document.getElementById('perc-name').innerHTML;
	UpdateGraphData();
	window.myLine.update();
}

function UpdatePerc(ps) {
	UpdateCurrPerc(ps);
	CorrectTargPerc(ps);
	UpdateTargRat(ps);
	UpdateRatDiff(ps);
	UpdateGraph(ps);
}

function DisablePercGroup(ps) {
	if (typeof PercGroups[ps] !== 'undefined') {
		document.getElementById(ps+'lockedbtn').style.display = 'none';
		document.getElementById(ps+'unlockedbtn').style.display = 'none';
		DisablePerc(ps);
		PercGroups[ps].forEach(DisablePerc);
		function DisablePerc(pss) {
			document.getElementById(pss+'lbl').disabled = true;
			document.getElementById(pss+'currrat').disabled = true;
			document.getElementById(pss+'currrat').value = 0;
			document.getElementById(pss+'currperc').disabled = true;
			document.getElementById(pss+'currperc').innerHTML = '-';
			document.getElementById(pss+'targperc').disabled = true;
			document.getElementById(pss+'targperc').value = 0;
			document.getElementById(pss+'targrat').disabled = true;
			document.getElementById(pss+'targrat').innerHTML = '-';
			document.getElementById(pss+'ratdiff').disabled = true;
			document.getElementById(pss+'ratdiff').innerHTML = '-';
			document.getElementById(pss+'ratdiff').style.backgroundColor = DiffColorZero;
		}
	}
}

function EnablePercGroup(ps) {
	if (typeof PercGroups[ps] !== 'undefined') {
		document.getElementById(ps+'lockedbtn').style.display = 'block';
		EnablePerc(ps);
		PercGroups[ps].forEach(EnablePerc);
		function EnablePerc(pss) {
			document.getElementById(pss+'lbl').disabled = false;
			document.getElementById(pss+'currrat').disabled = false;
			document.getElementById(pss+'currrat').value = '0';
			document.getElementById(pss+'currperc').disabled = false;
			document.getElementById(pss+'targperc').disabled = false;
			document.getElementById(pss+'targperc').value = '999';
			document.getElementById(pss+'targrat').disabled = false;
			document.getElementById(pss+'ratdiff').disabled = false;
			UpdatePerc(pss);
		}
		ProcessUnlockedBtn(document.getElementById(ps+'unlockedbtn'));
	}
}

var graphconfig = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Remaining',
			borderColor: 'grey',
			borderWidth: 3,
			backgroundColor: 'rgba(0, 0, 0, 0)',
			fill: false
		}, {
			label: 'Under Target',
			borderColor: 'red',
			borderWidth: 3,
			backgroundColor: 'rgba(0, 0, 0, 0)',
			fill: false
		}, {
			label: 'Above Target',
			borderColor: 'blue',
			borderWidth: 5,
			backgroundColor: 'rgba(0, 0, 0, 0)',
			fill: false
		}, {
			label: 'Current',
			borderColor: 'green',
			borderWidth: 5,
			backgroundColor: 'rgba(0, 0, 0, 0)',
			fill: false
		}]
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: true,
			text: 'Critical Hit Chance',
			fontSize: 18
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		elements: {
			point: {
				radius: 0
			}
		},
		scales: {
			xAxes: [{
				gridLines: {
				},
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'R'
				},
				ticks: {
					Min: 0,
					maxTicksLimit: 12
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '%'
				},
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
};

var GraphPoints = 122;

function InitGraph() {
	
	document.getElementById('perc-deco').setAttribute('src',document.getElementById('graph-sel-img-'+GraphPerc).getAttribute('src'));
	document.getElementById('perc-name').innerHTML = document.getElementById('graph-sel-desc-'+GraphPerc).innerHTML;
	graphconfig.options.title.text = document.getElementById('perc-name').innerHTML;
	UpdateGraphData();
	Chart.defaults.global.defaultFontSize = 14;
	Chart.defaults.global.defaultFontColor = 'black';
	window.myLine = new Chart(document.getElementById('graphcanvas').getContext('2d'),graphconfig);
}

function UpdateGraph(ps) {
	
	if (ps == PercTags[GraphPerc]) {
		UpdateGraphData();
		window.myLine.update();
	}
}

function UpdateGraphData() {
	
	var ps = PercTags[GraphPerc];
	
	var PD_LinkCurRat = Number(document.getElementById(ps+'currrat').value);
	var PD_LinkTgtRat = Number(document.getElementById(ps+'targrat').innerHTML);

	var csps = ReplaceArmourType(ps);
	var PD_Poff = CalcStat(csps+'PBonus',PlayerLvl);
	var PD_Pen = 0;
	var pr = PenRatings[ps];
	if (typeof pr !== 'undefined') {
		PD_Pen = PenChoices[PenChoice][pr];
	}
	var PD_RcapTotal = Math.ceil(CalcStat(csps+'PRatPCapR',PlayerLvl)-PD_Pen-DblCalcDev);
	
	var Rmax, Ticks;
//	var Rmax = Math.ceil(RmaxRaw,Math.min(0,-Math.floor(Math.log10(RmaxRaw)-1)));
	if (PD_LinkCurRat <= PD_RcapTotal) {
		Rmax = PD_RcapTotal*1.1;
		Ticks =  12;
	} else {
		var Rdiff = (PD_LinkCurRat-PD_RcapTotal);
		
		Rmax = PD_LinkCurRat*1.1;
	}
	
	var Rstep = Rmax/(GraphPoints-1);
	var Rhalfstep = Rstep/2;

	var Interval1 = PD_LinkCurRat-Rhalfstep;
	var Interval2 = PD_LinkCurRat+Rhalfstep;
	var Interval3 = PD_LinkTgtRat-Rhalfstep;
	var Interval4 = PD_LinkTgtRat+Rhalfstep;
	var Interval5 = Math.max(Interval1,Interval3);
	var Interval6 = Math.min(Interval2,Interval4);
	
	var	GDRating = [];
	var GDRemain = [];
	var GDUnder = [];
	var GDAbove = [];
	var GDCurrent = [];

	var r;
	var p;
	
	for (var i = 0; i < GraphPoints; i++) {
		r = Math.round(i*Rstep);
		GDRating.push(r);
		p = RoundDbl(PD_Poff+CalcStat(csps+'PRatP',PlayerLvl,r+PD_Pen),5);
		GDRemain.push(((r > Interval5) ? p : NaN));
		GDUnder.push((((Interval1 < r && r <= Interval4) && !(r > Interval5 && r <= Interval6)) ? p : NaN));
		GDAbove.push((((Interval3 < r && r <= Interval2) && !(r > Interval5 && r <= Interval6)) ? p : NaN));
		GDCurrent.push(((r <= Interval6) ? p : NaN));
	}
	
	graphconfig.data.labels = GDRating;
	graphconfig.data.datasets[0].data = GDRemain;
	graphconfig.data.datasets[1].data = GDUnder;
	graphconfig.data.datasets[2].data = GDAbove;
	graphconfig.data.datasets[3].data = GDCurrent;
}
