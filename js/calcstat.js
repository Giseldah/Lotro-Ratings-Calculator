// Created by Giseldah

// Floating point numbers bring errors into the calculation, both inside the Lotro-client and in this function collection. This is why a 100% match with the stats in Lotro is impossible.
// Anyway, to compensate for some errors, we use a calculation deviation correction value. This makes for instance 24.49999999 round to 25, as it's assumed that 24.5 was intended as outcome of a formula.
var DblCalcDev = 0.00000001;

function CalcStat(SName, SLvl, SParam)
{
	var SN = SName.trim().toUpperCase();

	var L = SLvl;
	var N = 1;
	var C = "";

	if (typeof SParam !== "undefined") {
		if (typeof SParam === "number" )
			N = SParam;
		else
			C = SParam;
	}

	if (SN < "PARTBLOCKMITPRATPCAPR") {
		if (SN < "EVADEPRATPB") {
			if (SN < "CHAMPIONCDARMOURTYPE") {
				if (SN < "BPEPBONUS") {
					if (SN < "BEORNINGCDARMOURTYPE") {
						if (SN < "ARMOURLOWRAW") {
							if (SN < "ADJTRAITPROGRATINGS") {
								if (SN == "-VERSION") {
									return "1.3.3p";
								} else {
									return 0;
								}
							} else if (SN > "ADJTRAITPROGRATINGS") {
								if (SN == "ARMCATMP") {
									if (L-DblCalcDev <= 0) {
										return 0;
									} else if (L-DblCalcDev <= 1) {
										return 14877/12350;
									} else if (L-DblCalcDev <= 2) {
										return 12415/12350;
									} else {
										return 9880/12350;
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 105) {
									return LinFmod(1,CalcStat("TraitProg",1,N),0.8*CalcStat("TraitProg",105,N),1,105,L)/CalcStat("TraitProg",L,N);
								} else if (L-DblCalcDev <= 106) {
									return LinFmod(1,0.8*CalcStat("TraitProg",105,N),CalcStat("TraitProg",106,N),105,106,L)/CalcStat("TraitProg",L,N);
								} else if (L-DblCalcDev <= 121) {
									return 1;
								} else if (L-DblCalcDev <= 130) {
									return LinFmod(1,CalcStat("TraitProg",121,N),0.9*CalcStat("TraitProg",130,N),121,130,L)/CalcStat("TraitProg",L,N);
								} else {
									return 0.9;
								}
							}
						} else if (SN > "ARMOURLOWRAW") {
							if (SN < "ARMPROGMP") {
								if (SN == "ARMPROG") {
									if (L-DblCalcDev <= 400) {
										return CalcStat("ItemProg",L,N)/CalcStat("StdProg",75,N);
									} else if (L-DblCalcDev <= 449) {
										return LinFmod(1,CalcStat("ItemProg",400,N)/CalcStat("StdProg",75,N),0.9*(CalcStat("ItemProg",449,N)/CalcStat("StdProg",75,N)),400,449,L);
									} else {
										return 0.9*(CalcStat("ItemProg",L,N)/CalcStat("StdProg",75,N));
									}
								} else {
									return 0;
								}
							} else if (SN > "ARMPROGMP") {
								if (SN > "ARMQTYLOWMP") {
									if (SN == "ARMTYPEMP") {
										if (L-DblCalcDev <= 0) {
											return 0;
										} else {
											return DataTableValue([9,9,18.75,30,15,25,12,37.5],L);
										}
									} else {
										return 0;
									}
								} else if (SN == "ARMQTYLOWMP") {
									if (L-DblCalcDev <= 0) {
										return 0;
									} else {
										return DataTableValue([50,50,50,50,50,49.8,50,50],L);
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 0) {
									return 0;
								} else if (L-DblCalcDev <= 1) {
									return CalcStat("ArmProg",N,CalcStat("ProgBMitHeavy",L));
								} else if (L-DblCalcDev <= 2) {
									return CalcStat("ArmProg",N,CalcStat("ProgBMitMedium",L));
								} else {
									return CalcStat("ArmProg",N,CalcStat("ProgBMitLight",L));
								}
							}
						} else {
							return CalcStat("ArmTypeMP",ArmCodeIndex(C,2))*CalcStat("ArmQtyLowMP",ArmCodeIndex(C,2))*CalcStat("ArmCatMP",ArmCodeIndex(C,1))*CalcStat("ArmProgMP",ArmCodeIndex(C,1),L);
						}
					} else if (SN > "BEORNINGCDARMOURTYPE") {
						if (SN < "BLOCKPRATPA") {
							if (SN < "BLOCKPBONUS") {
								if (SN == "BEORNINGCDCANBLOCK") {
									if (L-DblCalcDev <= 5) {
										return 0;
									} else {
										return 1;
									}
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPBONUS") {
								if (SN > "BLOCKPPRAT") {
									if (SN == "BLOCKPRATP") {
										return CalcStat("BPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPPRAT") {
									return CalcStat("BPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPBonus",L);
							}
						} else if (SN > "BLOCKPRATPA") {
							if (SN < "BLOCKPRATPC") {
								if (SN == "BLOCKPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPRATPC") {
								if (SN > "BLOCKPRATPCAP") {
									if (SN == "BLOCKPRATPCAPR") {
										return CalcStat("BPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATPCAP") {
									return CalcStat("BPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPC",L);
							}
						} else {
							return CalcStat("BPEPRatPA",L);
						}
					} else {
						return 3;
					}
				} else if (SN > "BPEPBONUS") {
					if (SN < "BRATLOW") {
						if (SN < "BPEPRATPB") {
							if (SN < "BPEPRATP") {
								if (SN == "BPEPPRAT") {
									return CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "BPEPRATP") {
								if (SN == "BPEPRATPA") {
									return 26;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCap",L),N);
							}
						} else if (SN > "BPEPRATPB") {
							if (SN < "BPEPRATPCAP") {
								if (SN == "BPEPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "BPEPRATPCAP") {
								if (SN > "BPEPRATPCAPR") {
									if (SN == "BRATHIGH") {
										return CalcStat("BratProg",L,CalcStat("ProgBHigh",L));
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPCAPR") {
									return CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 13;
							}
						} else {
							return CalcStat("BratLow",L);
						}
					} else if (SN > "BRATLOW") {
						if (SN < "BRATMITMEDIUM") {
							if (SN < "BRATMEDIUM") {
								if (SN == "BRATMASTERY") {
									return CalcStat("BratProg",L,CalcStat("ProgBMastery",L));
								} else {
									return 0;
								}
							} else if (SN > "BRATMEDIUM") {
								if (SN > "BRATMITHEAVY") {
									if (SN == "BRATMITLIGHT") {
										return CalcStat("BratProg",L,CalcStat("ProgBMitLight",L));
									} else {
										return 0;
									}
								} else if (SN == "BRATMITHEAVY") {
									return CalcStat("BratProg",L,CalcStat("ProgBMitHeavy",L));
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratProg",L,CalcStat("ProgBMedium",L));
							}
						} else if (SN > "BRATMITMEDIUM") {
							if (SN < "BURGLARCDARMOURTYPE") {
								if (SN == "BRATPROG") {
									if (L-DblCalcDev <= 75) {
										return LinFmod(RoundDbl(N),1,75,1,75,L);
									} else if (L-DblCalcDev <= 76) {
										return LinFmod(1,RoundDbl(N)*75,CalcStat("StdProg",76,N),75,76,L);
									} else if (L-DblCalcDev <= 100) {
										return LinFmod(1,CalcStat("StdProg",76,N),CalcStat("StdProg",100,N),75,100,L,-1);
									} else if (L-DblCalcDev <= 101) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 105) {
										return LinFmod(1,CalcStat("StdProg",101,N),CalcStat("StdProg",105,N),100,105,L,-1);
									} else if (L-DblCalcDev <= 106) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 115) {
										return LinFmod(1,CalcStat("StdProg",106,N),CalcStat("StdProg",115,N),106,115,L,-1);
									} else if (L-DblCalcDev <= 116) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 120) {
										return LinFmod(1,CalcStat("StdProg",116,N),CalcStat("StdProg",120,N),116,120,L,-1);
									} else if (L-DblCalcDev <= 121) {
										return CalcStat("StdProg",L,N);
									} else if (L-DblCalcDev <= 130) {
										return LinFmod(1,CalcStat("StdProg",121,N),CalcStat("StdProg",130,N),121,130,L,-1);
									} else if (L-DblCalcDev <= 131) {
										return CalcStat("StdProg",L,N);
									} else {
										return LinFmod(1,CalcStat("StdProg",131,N),CalcStat("StdProg",140,N),131,140,L,-1);
									}
								} else {
									return 0;
								}
							} else if (SN > "BURGLARCDARMOURTYPE") {
								if (SN > "CAPTAINCDARMOURTYPE") {
									if (SN == "CAPTAINCDCANBLOCK") {
										if (L-DblCalcDev <= 14) {
											return 0;
										} else {
											return 1;
										}
									} else {
										return 0;
									}
								} else if (SN == "CAPTAINCDARMOURTYPE") {
									return 3;
								} else {
									return 0;
								}
							} else {
								return 2;
							}
						} else {
							return CalcStat("BratProg",L,CalcStat("ProgBMitMedium",L));
						}
					} else {
						return CalcStat("BratProg",L,CalcStat("ProgBLow",L));
					}
				} else {
					return 0;
				}
			} else if (SN > "CHAMPIONCDARMOURTYPE") {
				if (SN < "CRITMAGNPPRAT") {
					if (SN < "CRITDEFPRATPCAPR") {
						if (SN < "CRITDEFPRATP") {
							if (SN < "CRITDEFPBONUS") {
								if (SN == "CHAMPIONCDCANBLOCK") {
									if (L-DblCalcDev <= 9) {
										return 0;
									} else {
										return 1;
									}
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPBONUS") {
								if (SN == "CRITDEFPPRAT") {
									return CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "CRITDEFPRATP") {
							if (SN < "CRITDEFPRATPB") {
								if (SN == "CRITDEFPRATPA") {
									return 160;
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPRATPB") {
								if (SN > "CRITDEFPRATPC") {
									if (SN == "CRITDEFPRATPCAP") {
										return 80;
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratLow",L);
							}
						} else {
							return CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
						}
					} else if (SN > "CRITDEFPRATPCAPR") {
						if (SN < "CRITHITPRATPB") {
							if (SN < "CRITHITPPRAT") {
								if (SN == "CRITHITPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPPRAT") {
								if (SN > "CRITHITPRATP") {
									if (SN == "CRITHITPRATPA") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATP") {
									return CalcPercAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCapR",L),N);
							}
						} else if (SN > "CRITHITPRATPB") {
							if (SN < "CRITHITPRATPCAP") {
								if (SN == "CRITHITPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPRATPCAP") {
								if (SN > "CRITHITPRATPCAPR") {
									if (SN == "CRITMAGNPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATPCAPR") {
									return CalcStat("CritHitPRatPB",L)*CalcStat("CritHitPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 25;
							}
						} else {
							return CalcStat("BratLow",L);
						}
					} else {
						return CalcStat("CritDefPRatPB",L)*CalcStat("CritDefPRatPC",L);
					}
				} else if (SN > "CRITMAGNPPRAT") {
					if (SN < "DEVHITPRATP") {
						if (SN < "CRITMAGNPRATPC") {
							if (SN < "CRITMAGNPRATPA") {
								if (SN == "CRITMAGNPRATP") {
									return CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPA") {
								if (SN == "CRITMAGNPRATPB") {
									return CalcStat("BratHigh",L);
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 120) {
									return 200;
								} else if (L-DblCalcDev <= 127) {
									return (-5)*L+750;
								} else {
									return 112.5;
								}
							}
						} else if (SN > "CRITMAGNPRATPC") {
							if (SN < "CRITMAGNPRATPCAPR") {
								if (SN == "CRITMAGNPRATPCAP") {
									if (L-DblCalcDev <= 120) {
										return 100;
									} else {
										return 75;
									}
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPCAPR") {
								if (SN > "DEVHITPBONUS") {
									if (SN == "DEVHITPPRAT") {
										return CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
							}
						} else {
							return CalcStat("CritMagnPRatPCap",L)/(CalcStat("CritMagnPRatPA",L)-CalcStat("CritMagnPRatPCap",L));
						}
					} else if (SN > "DEVHITPRATP") {
						if (SN < "DEVHITPRATPCAPR") {
							if (SN < "DEVHITPRATPB") {
								if (SN == "DEVHITPRATPA") {
									return 20;
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPRATPB") {
								if (SN > "DEVHITPRATPC") {
									if (SN == "DEVHITPRATPCAP") {
										return 10;
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratMedium",L);
							}
						} else if (SN > "DEVHITPRATPCAPR") {
							if (SN < "EVADEPPRAT") {
								if (SN == "EVADEPBONUS") {
									return CalcStat("BPEPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPPRAT") {
								if (SN > "EVADEPRATP") {
									if (SN == "EVADEPRATPA") {
										return CalcStat("BPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATP") {
									return CalcStat("BPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPPRat",L,N);
							}
						} else {
							return CalcStat("DevHitPRatPB",L)*CalcStat("DevHitPRatPC",L);
						}
					} else {
						return CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
					}
				} else {
					return CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
				}
			} else {
				return 3;
			}
		} else if (SN > "EVADEPRATPB") {
			if (SN < "MITLIGHTPPRAT") {
				if (SN < "INHEALPRATPA") {
					if (SN < "FINESSEPRATPC") {
						if (SN < "FINESSEPBONUS") {
							if (SN < "EVADEPRATPCAP") {
								if (SN == "EVADEPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPRATPCAP") {
								if (SN == "EVADEPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCap",L);
							}
						} else if (SN > "FINESSEPBONUS") {
							if (SN < "FINESSEPRATP") {
								if (SN == "FINESSEPPRAT") {
									return CalcRatAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATP") {
								if (SN > "FINESSEPRATPA") {
									if (SN == "FINESSEPRATPB") {
										return CalcStat("BratLow",L);
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATPA") {
									return 100;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCap",L),N);
							}
						} else {
							return 0;
						}
					} else if (SN > "FINESSEPRATPC") {
						if (SN < "HUNTERCDARMOURTYPE") {
							if (SN < "FINESSEPRATPCAPR") {
								if (SN == "FINESSEPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATPCAPR") {
								if (SN > "GUARDIANCDARMOURTYPE") {
									if (SN == "GUARDIANCDCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "GUARDIANCDARMOURTYPE") {
									return 3;
								} else {
									return 0;
								}
							} else {
								return CalcStat("FinessePRatPB",L)*CalcStat("FinessePRatPC",L);
							}
						} else if (SN > "HUNTERCDARMOURTYPE") {
							if (SN < "INHEALPBONUS") {
								if (SN == "ILVLTOLVL") {
									if (L-DblCalcDev <= 79) {
										return LinFmod(1,1,75,1,79,L)*N;
									} else if (L-DblCalcDev <= 80) {
										return LinFmod(1,75,76,79,80,L)*N;
									} else if (L-DblCalcDev <= 200) {
										return LinFmod(1,76,100,80,200,L)*N;
									} else if (L-DblCalcDev <= 205) {
										return LinFmod(1,100,101,200,205,L)*N;
									} else if (L-DblCalcDev <= 225) {
										return LinFmod(1,101,105,205,225,L)*N;
									} else if (L-DblCalcDev <= 300) {
										return LinFmod(1,105,106,225,300,L)*N;
									} else if (L-DblCalcDev <= 349) {
										return LinFmod(1,106,115,300,349,L)*N;
									} else if (L-DblCalcDev <= 350) {
										return LinFmod(1,115,116,349,350,L)*N;
									} else if (L-DblCalcDev <= 399) {
										return LinFmod(1,116,120,350,399,L)*N;
									} else if (L-DblCalcDev <= 400) {
										return LinFmod(1,120,121,399,400,L)*N;
									} else if (L-DblCalcDev <= 449) {
										return LinFmod(1,121,130,400,449,L)*N;
									} else if (L-DblCalcDev <= 450) {
										return LinFmod(1,130,131,449,450,L)*N;
									} else {
										return LinFmod(1,131,140,450,499,L)*N;
									}
								} else {
									return 0;
								}
							} else if (SN > "INHEALPBONUS") {
								if (SN > "INHEALPPRAT") {
									if (SN == "INHEALPRATP") {
										return CalcPercAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "INHEALPPRAT") {
									return CalcRatAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							return 2;
						}
					} else {
						return 1;
					}
				} else if (SN > "INHEALPRATPA") {
					if (SN < "MINSTRELCDCANBLOCK") {
						if (SN < "INHEALPRATPCAPR") {
							if (SN < "INHEALPRATPC") {
								if (SN == "INHEALPRATPB") {
									return CalcStat("BratLow",L);
								} else {
									return 0;
								}
							} else if (SN > "INHEALPRATPC") {
								if (SN == "INHEALPRATPCAP") {
									return 25;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else if (SN > "INHEALPRATPCAPR") {
							if (SN < "LEVELCAP") {
								if (SN == "ITEMPROG") {
									return CalcStat("StatProg",CalcStat("ILvlToLvl",L),N);
								} else {
									return 0;
								}
							} else if (SN > "LEVELCAP") {
								if (SN > "LOREMASTERCDARMOURTYPE") {
									if (SN == "MINSTRELCDARMOURTYPE") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "LOREMASTERCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return 130;
							}
						} else {
							return CalcStat("InHealPRatPB",L)*CalcStat("InHealPRatPC",L);
						}
					} else if (SN > "MINSTRELCDCANBLOCK") {
						if (SN < "MITHEAVYPRATPB") {
							if (SN < "MITHEAVYPPRAT") {
								if (SN == "MITHEAVYPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPPRAT") {
								if (SN > "MITHEAVYPRATP") {
									if (SN == "MITHEAVYPRATPA") {
										return 110;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATP") {
									return CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
							}
						} else if (SN > "MITHEAVYPRATPB") {
							if (SN < "MITHEAVYPRATPCAP") {
								if (SN == "MITHEAVYPRATPC") {
									return 1.2;
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATPCAP") {
								if (SN > "MITHEAVYPRATPCAPR") {
									if (SN == "MITLIGHTPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPCAPR") {
									return CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 60;
							}
						} else {
							return CalcStat("BratMitHeavy",L);
						}
					} else {
						if (L-DblCalcDev <= 19) {
							return 0;
						} else {
							return 1;
						}
					}
				} else {
					return 50;
				}
			} else if (SN > "MITLIGHTPPRAT") {
				if (SN < "OUTHEALPRATPB") {
					if (SN < "MITMEDIUMPRATP") {
						if (SN < "MITLIGHTPRATPC") {
							if (SN < "MITLIGHTPRATPA") {
								if (SN == "MITLIGHTPRATP") {
									return CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPRATPA") {
								if (SN == "MITLIGHTPRATPB") {
									return CalcStat("BratMitLight",L);
								} else {
									return 0;
								}
							} else {
								return 65;
							}
						} else if (SN > "MITLIGHTPRATPC") {
							if (SN < "MITLIGHTPRATPCAPR") {
								if (SN == "MITLIGHTPRATPCAP") {
									return 40;
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPRATPCAPR") {
								if (SN > "MITMEDIUMPBONUS") {
									if (SN == "MITMEDIUMPPRAT") {
										return CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPB",L)*CalcStat("MitLightPRatPC",L);
							}
						} else {
							return 1.6;
						}
					} else if (SN > "MITMEDIUMPRATP") {
						if (SN < "MITMEDIUMPRATPCAPR") {
							if (SN < "MITMEDIUMPRATPB") {
								if (SN == "MITMEDIUMPRATPA") {
									return 85;
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATPB") {
								if (SN > "MITMEDIUMPRATPC") {
									if (SN == "MITMEDIUMPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPC") {
									return 10/7;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratMitMedium",L);
							}
						} else if (SN > "MITMEDIUMPRATPCAPR") {
							if (SN < "OUTHEALPPRAT") {
								if (SN == "OUTHEALPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPPRAT") {
								if (SN > "OUTHEALPRATP") {
									if (SN == "OUTHEALPRATPA") {
										return 140;
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATP") {
									return CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
							}
						} else {
							return CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
						}
					} else {
						return CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
					}
				} else if (SN > "OUTHEALPRATPB") {
					if (SN < "PARRYPRATPC") {
						if (SN < "PARRYPBONUS") {
							if (SN < "OUTHEALPRATPCAP") {
								if (SN == "OUTHEALPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPRATPCAP") {
								if (SN == "OUTHEALPRATPCAPR") {
									return CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 70;
							}
						} else if (SN > "PARRYPBONUS") {
							if (SN < "PARRYPRATP") {
								if (SN == "PARRYPPRAT") {
									return CalcStat("BPEPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATP") {
								if (SN > "PARRYPRATPA") {
									if (SN == "PARRYPRATPB") {
										return CalcStat("BPEPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPA") {
									return CalcStat("BPEPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatP",L,N);
							}
						} else {
							return CalcStat("BPEPBonus",L);
						}
					} else if (SN > "PARRYPRATPC") {
						if (SN < "PARTBLOCKMITPRATP") {
							if (SN < "PARRYPRATPCAPR") {
								if (SN == "PARRYPRATPCAP") {
									return CalcStat("BPEPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATPCAPR") {
								if (SN > "PARTBLOCKMITPBONUS") {
									if (SN == "PARTBLOCKMITPPRAT") {
										return CalcStat("PartMitPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCapR",L);
							}
						} else if (SN > "PARTBLOCKMITPRATP") {
							if (SN < "PARTBLOCKMITPRATPB") {
								if (SN == "PARTBLOCKMITPRATPA") {
									return CalcStat("PartMitPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPRATPB") {
								if (SN > "PARTBLOCKMITPRATPC") {
									if (SN == "PARTBLOCKMITPRATPCAP") {
										return CalcStat("PartMitPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPB",L);
							}
						} else {
							return CalcStat("PartMitPRatP",L,N);
						}
					} else {
						return CalcStat("BPEPRatPC",L);
					}
				} else {
					return CalcStat("BratMedium",L);
				}
			} else {
				return CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
			}
		} else {
			return CalcStat("BPEPRatPB",L);
		}
	} else if (SN > "PARTBLOCKMITPRATPCAPR") {
		if (SN < "PHYMITLPRATPA") {
			if (SN < "PARTMITPRATPC") {
				if (SN < "PARTEVADEMITPRATP") {
					if (SN < "PARTBPEPBONUS") {
						if (SN < "PARTBLOCKPRATPA") {
							if (SN < "PARTBLOCKPPRAT") {
								if (SN == "PARTBLOCKPBONUS") {
									return CalcStat("PartBPEPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPPRAT") {
								if (SN == "PARTBLOCKPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPPRat",L,N);
							}
						} else if (SN > "PARTBLOCKPRATPA") {
							if (SN < "PARTBLOCKPRATPC") {
								if (SN == "PARTBLOCKPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPRATPC") {
								if (SN > "PARTBLOCKPRATPCAP") {
									if (SN == "PARTBLOCKPRATPCAPR") {
										return CalcStat("PartBPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPC",L);
							}
						} else {
							return CalcStat("PartBPEPRatPA",L);
						}
					} else if (SN > "PARTBPEPBONUS") {
						if (SN < "PARTBPEPRATPC") {
							if (SN < "PARTBPEPRATP") {
								if (SN == "PARTBPEPPRAT") {
									return CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPRATP") {
								if (SN > "PARTBPEPRATPA") {
									if (SN == "PARTBPEPRATPB") {
										return CalcStat("BratMedium",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPA") {
									return 70;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
							}
						} else if (SN > "PARTBPEPRATPC") {
							if (SN < "PARTBPEPRATPCAPR") {
								if (SN == "PARTBPEPRATPCAP") {
									return 35;
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPRATPCAPR") {
								if (SN > "PARTEVADEMITPBONUS") {
									if (SN == "PARTEVADEMITPPRAT") {
										return CalcStat("PartMitPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPBONUS") {
									if (L-DblCalcDev <= 1) {
										return 35;
									} else {
										return CalcStat("PartMitPBonus",L);
									}
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPB",L)*CalcStat("PartBPEPRatPC",L);
							}
						} else {
							return 1;
						}
					} else {
						return 0;
					}
				} else if (SN > "PARTEVADEMITPRATP") {
					if (SN < "PARTEVADEPRATPA") {
						if (SN < "PARTEVADEMITPRATPCAP") {
							if (SN < "PARTEVADEMITPRATPB") {
								if (SN == "PARTEVADEMITPRATPA") {
									return CalcStat("PartMitPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEMITPRATPB") {
								if (SN == "PARTEVADEMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPB",L);
							}
						} else if (SN > "PARTEVADEMITPRATPCAP") {
							if (SN < "PARTEVADEPBONUS") {
								if (SN == "PARTEVADEMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPBONUS") {
								if (SN > "PARTEVADEPPRAT") {
									if (SN == "PARTEVADEPRATP") {
										return CalcStat("PartBPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPPRAT") {
									return CalcStat("PartBPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPBonus",L);
							}
						} else {
							return CalcStat("PartMitPRatPCap",L);
						}
					} else if (SN > "PARTEVADEPRATPA") {
						if (SN < "PARTMITPBONUS") {
							if (SN < "PARTEVADEPRATPC") {
								if (SN == "PARTEVADEPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPRATPC") {
								if (SN > "PARTEVADEPRATPCAP") {
									if (SN == "PARTEVADEPRATPCAPR") {
										return CalcStat("PartBPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPC",L);
							}
						} else if (SN > "PARTMITPBONUS") {
							if (SN < "PARTMITPRATP") {
								if (SN == "PARTMITPPRAT") {
									return CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATP") {
								if (SN > "PARTMITPRATPA") {
									if (SN == "PARTMITPRATPB") {
										return CalcStat("BratMedium",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATPA") {
									return 100;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
							}
						} else {
							return 10;
						}
					} else {
						return CalcStat("PartBPEPRatPA",L);
					}
				} else {
					return CalcStat("PartMitPRatP",L,N);
				}
			} else if (SN > "PARTMITPRATPC") {
				if (SN < "PHYDMGPBONUS") {
					if (SN < "PARTPARRYMITPRATPCAP") {
						if (SN < "PARTPARRYMITPPRAT") {
							if (SN < "PARTMITPRATPCAPR") {
								if (SN == "PARTMITPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATPCAPR") {
								if (SN == "PARTPARRYMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
							}
						} else if (SN > "PARTPARRYMITPPRAT") {
							if (SN < "PARTPARRYMITPRATPA") {
								if (SN == "PARTPARRYMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPRATPA") {
								if (SN > "PARTPARRYMITPRATPB") {
									if (SN == "PARTPARRYMITPRATPC") {
										return CalcStat("PartMitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATPB") {
									return CalcStat("PartMitPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPA",L);
							}
						} else {
							return CalcStat("PartMitPPRat",L,N);
						}
					} else if (SN > "PARTPARRYMITPRATPCAP") {
						if (SN < "PARTPARRYPRATPA") {
							if (SN < "PARTPARRYPBONUS") {
								if (SN == "PARTPARRYMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPBONUS") {
								if (SN > "PARTPARRYPPRAT") {
									if (SN == "PARTPARRYPRATP") {
										return CalcStat("PartBPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPPRAT") {
									return CalcStat("PartBPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPBonus",L);
							}
						} else if (SN > "PARTPARRYPRATPA") {
							if (SN < "PARTPARRYPRATPC") {
								if (SN == "PARTPARRYPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATPC") {
								if (SN > "PARTPARRYPRATPCAP") {
									if (SN == "PARTPARRYPRATPCAPR") {
										return CalcStat("PartBPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPC",L);
							}
						} else {
							return CalcStat("PartBPEPRatPA",L);
						}
					} else {
						return CalcStat("PartMitPRatPCap",L);
					}
				} else if (SN > "PHYDMGPBONUS") {
					if (SN < "PHYMITHPPRAT") {
						if (SN < "PHYDMGPRATPB") {
							if (SN < "PHYDMGPRATP") {
								if (SN == "PHYDMGPPRAT") {
									return CalcRatAB(CalcStat("PhyDmgPRatPA",L),CalcStat("PhyDmgPRatPB",L),CalcStat("PhyDmgPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATP") {
								if (SN == "PHYDMGPRATPA") {
									return 400;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("PhyDmgPRatPA",L),CalcStat("PhyDmgPRatPB",L),CalcStat("PhyDmgPRatPCap",L),N);
							}
						} else if (SN > "PHYDMGPRATPB") {
							if (SN < "PHYDMGPRATPCAP") {
								if (SN == "PHYDMGPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATPCAP") {
								if (SN > "PHYDMGPRATPCAPR") {
									if (SN == "PHYMITHPBONUS") {
										return CalcStat("MitHeavyPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATPCAPR") {
									return CalcStat("PhyDmgPRatPB",L)*CalcStat("PhyDmgPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 200;
							}
						} else {
							return CalcStat("BratMastery",L);
						}
					} else if (SN > "PHYMITHPPRAT") {
						if (SN < "PHYMITHPRATPCAP") {
							if (SN < "PHYMITHPRATPA") {
								if (SN == "PHYMITHPRATP") {
									return CalcStat("MitHeavyPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPRATPA") {
								if (SN > "PHYMITHPRATPB") {
									if (SN == "PHYMITHPRATPC") {
										return CalcStat("MitHeavyPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATPB") {
									return CalcStat("MitHeavyPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPA",L);
							}
						} else if (SN > "PHYMITHPRATPCAP") {
							if (SN < "PHYMITLPBONUS") {
								if (SN == "PHYMITHPRATPCAPR") {
									return CalcStat("MitHeavyPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPBONUS") {
								if (SN > "PHYMITLPPRAT") {
									if (SN == "PHYMITLPRATP") {
										return CalcStat("MitLightPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPPRAT") {
									return CalcStat("MitLightPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPBonus",L);
							}
						} else {
							return CalcStat("MitHeavyPRatPCap",L);
						}
					} else {
						return CalcStat("MitHeavyPPRat",L,N);
					}
				} else {
					return 0;
				}
			} else {
				return 1;
			}
		} else if (SN > "PHYMITLPRATPA") {
			if (SN < "TACDMGPBONUS") {
				if (SN < "PROGBMITLIGHT") {
					if (SN < "PHYMITMPRATPB") {
						if (SN < "PHYMITLPRATPCAPR") {
							if (SN < "PHYMITLPRATPC") {
								if (SN == "PHYMITLPRATPB") {
									return CalcStat("MitLightPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATPC") {
								if (SN == "PHYMITLPRATPCAP") {
									return CalcStat("MitLightPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPC",L);
							}
						} else if (SN > "PHYMITLPRATPCAPR") {
							if (SN < "PHYMITMPPRAT") {
								if (SN == "PHYMITMPBONUS") {
									return CalcStat("MitMediumPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPPRAT") {
								if (SN > "PHYMITMPRATP") {
									if (SN == "PHYMITMPRATPA") {
										return CalcStat("MitMediumPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPRATP") {
									return CalcStat("MitMediumPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPPRat",L,N);
							}
						} else {
							return CalcStat("MitLightPRatPCapR",L);
						}
					} else if (SN > "PHYMITMPRATPB") {
						if (SN < "PROGBHIGH") {
							if (SN < "PHYMITMPRATPCAP") {
								if (SN == "PHYMITMPRATPC") {
									return CalcStat("MitMediumPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPRATPCAP") {
								if (SN > "PHYMITMPRATPCAPR") {
									if (SN == "PNTMPDEFENCE") {
										return 351/13000;
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPRATPCAPR") {
									return CalcStat("MitMediumPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPCap",L);
							}
						} else if (SN > "PROGBHIGH") {
							if (SN < "PROGBMASTERY") {
								if (SN == "PROGBLOW") {
									return 200;
								} else {
									return 0;
								}
							} else if (SN > "PROGBMASTERY") {
								if (SN > "PROGBMEDIUM") {
									if (SN == "PROGBMITHEAVY") {
										return 174;
									} else {
										return 0;
									}
								} else if (SN == "PROGBMEDIUM") {
									return 400;
								} else {
									return 0;
								}
							} else {
								return 270;
							}
						} else {
							return 500;
						}
					} else {
						return CalcStat("MitMediumPRatPB",L);
					}
				} else if (SN > "PROGBMITLIGHT") {
					if (SN < "RESISTPRATPCAP") {
						if (SN < "RESISTPPRAT") {
							if (SN < "RATDEFENCET") {
								if (SN == "PROGBMITMEDIUM") {
									return 382/3;
								} else {
									return 0;
								}
							} else if (SN > "RATDEFENCET") {
								if (SN == "RESISTPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("PntMPDefence",L)*CalcStat("TraitProg",L,CalcStat("ProgBMedium",L))*CalcStat("AdjTraitProgRatings",L,CalcStat("ProgBMedium",L))*N;
							}
						} else if (SN > "RESISTPPRAT") {
							if (SN < "RESISTPRATPA") {
								if (SN == "RESISTPRATP") {
									return CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "RESISTPRATPA") {
								if (SN > "RESISTPRATPB") {
									if (SN == "RESISTPRATPC") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATPB") {
									return CalcStat("BratLow",L);
								} else {
									return 0;
								}
							} else {
								return 100;
							}
						} else {
							return CalcRatAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCapR",L),N);
						}
					} else if (SN > "RESISTPRATPCAP") {
						if (SN < "STDPROG") {
							if (SN < "RESISTT") {
								if (SN == "RESISTPRATPCAPR") {
									return CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "RESISTT") {
								if (SN > "RUNEKEEPERCDARMOURTYPE") {
									if (SN == "STATPROG") {
										if (L-DblCalcDev <= 75) {
											return LinFmod(RoundDbl(N),1,75,1,75,L);
										} else if (L-DblCalcDev <= 76) {
											return LinFmod(1,RoundDbl(N)*75,CalcStat("StdProg",76,N),75,76,L);
										} else {
											return CalcStat("StdProg",L,N);
										}
									} else {
										return 0;
									}
								} else if (SN == "RUNEKEEPERCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("RatDefenceT",L,N);
							}
						} else if (SN > "STDPROG") {
							if (SN < "T2PENBPE") {
								if (SN == "T2PENARMOUR") {
									return CalcStat("T2penMit",L);
								} else {
									return 0;
								}
							} else if (SN > "T2PENBPE") {
								if (SN > "T2PENMIT") {
									if (SN == "T2PENRESIST") {
										if (L-DblCalcDev <= 115) {
											return (-90)*L;
										} else if (L-DblCalcDev <= 116) {
											return ExpFmod(CalcStat("T2penResist",115),116,20,L);
										} else if (L-DblCalcDev <= 120) {
											return ExpFmod(CalcStat("T2penResist",116),117,5.5,L);
										} else if (L-DblCalcDev <= 121) {
											return ExpFmod(CalcStat("T2penResist",120),121,20,L);
										} else if (L-DblCalcDev <= 125) {
											return ExpFmod(CalcStat("T2penResist",121),122,5.5,L);
										} else if (L-DblCalcDev <= 126) {
											return ExpFmod(CalcStat("T2penResist",125),126,20,L);
										} else {
											return ExpFmod(CalcStat("T2penResist",126),127,5.5,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "T2PENMIT") {
									if (L-DblCalcDev <= 115) {
										return FloorDbl(L*13.5)*-5;
									} else if (L-DblCalcDev <= 116) {
										return ExpFmod(CalcStat("T2penMit",115),116,20,L);
									} else if (L-DblCalcDev <= 120) {
										return ExpFmod(CalcStat("T2penMit",116),117,5.5,L);
									} else if (L-DblCalcDev <= 121) {
										return ExpFmod(CalcStat("T2penMit",120),121,20,L);
									} else if (L-DblCalcDev <= 125) {
										return ExpFmod(CalcStat("T2penMit",121),122,5.5,L);
									} else if (L-DblCalcDev <= 126) {
										return ExpFmod(CalcStat("T2penMit",125),126,20,L);
									} else {
										return ExpFmod(CalcStat("T2penMit",126),127,5.5,L);
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 115) {
									return (-40)*L;
								} else if (L-DblCalcDev <= 116) {
									return ExpFmod(CalcStat("T2penBPE",115),116,20,L);
								} else if (L-DblCalcDev <= 120) {
									return ExpFmod(CalcStat("T2penBPE",116),117,5.5,L);
								} else if (L-DblCalcDev <= 121) {
									return ExpFmod(CalcStat("T2penBPE",120),121,20,L);
								} else if (L-DblCalcDev <= 125) {
									return ExpFmod(CalcStat("T2penBPE",121),122,5.5,L);
								} else if (L-DblCalcDev <= 126) {
									return ExpFmod(CalcStat("T2penBPE",125),126,20,L);
								} else {
									return ExpFmod(CalcStat("T2penBPE",126),127,5.5,L);
								}
							}
						} else {
							if (L-DblCalcDev <= 75) {
								return LinFmod(N,1,75,1,75,L);
							} else if (L-DblCalcDev <= 76) {
								return LinFmod(1,N*75,RoundDbl(N*82.5,-2),75,76,L);
							} else if (L-DblCalcDev <= 100) {
								return LinFmod(1,RoundDbl(N*82.5,-2),N*150,76,100,L);
							} else if (L-DblCalcDev <= 101) {
								return LinFmod(N,150,165,100,101,L);
							} else if (L-DblCalcDev <= 105) {
								return LinFmod(N,165,225,101,105,L);
							} else if (L-DblCalcDev <= 106) {
								return LinFmod(N,225,270,105,106,L);
							} else if (L-DblCalcDev <= 115) {
								return LinFmod(N,270,450,106,115,L);
							} else if (L-DblCalcDev <= 116) {
								return LinFmod(N,450,495,115,116,L);
							} else if (L-DblCalcDev <= 120) {
								return LinFmod(N,495,1125,116,120,L);
							} else if (L-DblCalcDev <= 121) {
								return LinFmod(N,1125,1575,120,121,L);
							} else if (L-DblCalcDev <= 130) {
								return LinFmod(N,1575,3150,121,130,L);
							} else if (L-DblCalcDev <= 131) {
								return LinFmod(N,3150,3780,130,131,L);
							} else {
								return LinFmod(N,3780,6300,130,140,L);
							}
						}
					} else {
						return 50;
					}
				} else {
					return 280/3;
				}
			} else if (SN > "TACDMGPBONUS") {
				if (SN < "TACMITLPRATPA") {
					if (SN < "TACMITHPPRAT") {
						if (SN < "TACDMGPRATPB") {
							if (SN < "TACDMGPRATP") {
								if (SN == "TACDMGPPRAT") {
									return CalcRatAB(CalcStat("TacDmgPRatPA",L),CalcStat("TacDmgPRatPB",L),CalcStat("TacDmgPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPRATP") {
								if (SN == "TACDMGPRATPA") {
									return 400;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("TacDmgPRatPA",L),CalcStat("TacDmgPRatPB",L),CalcStat("TacDmgPRatPCap",L),N);
							}
						} else if (SN > "TACDMGPRATPB") {
							if (SN < "TACDMGPRATPCAP") {
								if (SN == "TACDMGPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPRATPCAP") {
								if (SN > "TACDMGPRATPCAPR") {
									if (SN == "TACMITHPBONUS") {
										return CalcStat("MitHeavyPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPRATPCAPR") {
									return CalcStat("TacDmgPRatPB",L)*CalcStat("TacDmgPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 200;
							}
						} else {
							return CalcStat("BratMastery",L);
						}
					} else if (SN > "TACMITHPPRAT") {
						if (SN < "TACMITHPRATPCAP") {
							if (SN < "TACMITHPRATPA") {
								if (SN == "TACMITHPRATP") {
									return CalcStat("MitHeavyPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACMITHPRATPA") {
								if (SN > "TACMITHPRATPB") {
									if (SN == "TACMITHPRATPC") {
										return CalcStat("MitHeavyPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPRATPB") {
									return CalcStat("MitHeavyPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPA",L);
							}
						} else if (SN > "TACMITHPRATPCAP") {
							if (SN < "TACMITLPBONUS") {
								if (SN == "TACMITHPRATPCAPR") {
									return CalcStat("MitHeavyPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPBONUS") {
								if (SN > "TACMITLPPRAT") {
									if (SN == "TACMITLPRATP") {
										return CalcStat("MitLightPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPPRAT") {
									return CalcStat("MitLightPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPBonus",L);
							}
						} else {
							return CalcStat("MitHeavyPRatPCap",L);
						}
					} else {
						return CalcStat("MitHeavyPPRat",L,N);
					}
				} else if (SN > "TACMITLPRATPA") {
					if (SN < "TACMITMPRATPC") {
						if (SN < "TACMITMPBONUS") {
							if (SN < "TACMITLPRATPC") {
								if (SN == "TACMITLPRATPB") {
									return CalcStat("MitLightPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPRATPC") {
								if (SN > "TACMITLPRATPCAP") {
									if (SN == "TACMITLPRATPCAPR") {
										return CalcStat("MitLightPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPRATPCAP") {
									return CalcStat("MitLightPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPC",L);
							}
						} else if (SN > "TACMITMPBONUS") {
							if (SN < "TACMITMPRATP") {
								if (SN == "TACMITMPPRAT") {
									return CalcStat("MitMediumPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "TACMITMPRATP") {
								if (SN > "TACMITMPRATPA") {
									if (SN == "TACMITMPRATPB") {
										return CalcStat("MitMediumPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITMPRATPA") {
									return CalcStat("MitMediumPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatP",L,N);
							}
						} else {
							return CalcStat("MitMediumPBonus",L);
						}
					} else if (SN > "TACMITMPRATPC") {
						if (SN < "TPENCHOICE") {
							if (SN < "TACMITMPRATPCAPR") {
								if (SN == "TACMITMPRATPCAP") {
									return CalcStat("MitMediumPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITMPRATPCAPR") {
								if (SN > "TPENARMOUR") {
									if (SN == "TPENBPE") {
										return CalcStat("TpenChoice",N)*CalcStat("RatDefenceT",L);
									} else {
										return 0;
									}
								} else if (SN == "TPENARMOUR") {
									return CalcStat("TpenChoice",N)*(CalcStat("ArmourLowRaw",1,"MSh")/CalcStat("TraitProg",1,CalcStat("ProgBMitMedium",L)))*CalcStat("TraitProg",L,CalcStat("ProgBMitMedium",L))*CalcStat("AdjTraitProgRatings",L,CalcStat("ProgBMitMedium",L));
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPCapR",L);
							}
						} else if (SN > "TPENCHOICE") {
							if (SN < "TRAITPROG") {
								if (SN == "TPENRESIST") {
									return CalcStat("TpenChoice",N)*CalcStat("ResistT",L,2);
								} else {
									return 0;
								}
							} else if (SN > "TRAITPROG") {
								if (SN > "WARDENCDARMOURTYPE") {
									if (SN == "WARDENCDCANBLOCK") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "WARDENCDARMOURTYPE") {
									return 2;
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 105) {
									return LinFmod(1,CalcStat("StatProg",1,N),CalcStat("StatProg",105,N),1,105,L);
								} else {
									return CalcStat("StatProg",L,N);
								}
							}
						} else {
							return DataTableValue([0,-1,-2],L);
						}
					} else {
						return CalcStat("MitMediumPRatPC",L);
					}
				} else {
					return CalcStat("MitLightPRatPA",L);
				}
			} else {
				return 0;
			}
		} else {
			return CalcStat("MitLightPRatPA",L);
		}
	} else {
		return CalcStat("PartMitPRatPCapR",L);
	}
}

// Support functions for CalcStat. These consist of implementations of more complex calculation types, decode methods for parameter "C" and rounding/min/max/compare functions for floating point numbers.

// ****************** Calculation Type support functions ******************

// DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
// DataTableValue: Takes a value from an array table.

function DataTableValue(vDataArray, lIndex)
{
	return ((lIndex <= 1) ? vDataArray[0] : ((lIndex >= vDataArray.length) ? vDataArray[vDataArray.length-1] : vDataArray[lIndex-1]));
}

// EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
// ExpFmod: Exponential function based on percentage.
// Common percentage values are around ~5.5% for between levels and ~20% jumps between level segments.

function ExpFmod(dVal, dLstart, dPlvl, dLvl)
{
	return ((dLvl-dLstart+1 <= DblCalcDev) ? dVal : dVal*Math.pow(1+dPlvl/100,dLvl-dLstart+1));
}

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// CalcPercAB: Calculates the percentage out of a rating based on the AB formula.

function CalcPercAB(dA, dB, dPCap, dR)
{
	if (dR <= DblCalcDev)
		return 0;
	else {
		var dResult = dA/(1+dB/dR);
		return ((dResult >= dPCap-DblCalcDev) ? dPCap : dResult);
	}
}

// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// CalcRatAB: Calculates the rating out of a percentage based on the AB formula.

function CalcRatAB(dA, dB, dCapR, dP)
{
	if (dP <= DblCalcDev)
		return 0;
	else {
		var dResult = dB/(dA/dP-1);
		return ((dResult >= dCapR-DblCalcDev) ? dCapR : dResult);
	}
}

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LinFmod: Linear line function between 2 points with some optional modifications.
// Connects point (dLstart,dVal*dFstart) with (dLend,dVal*dFend).
// Usually used with dVal=1 and dFstart/dFend containing unrelated points or dVal=# and dFstart/dFend containing multiplier factors.
// Modification for in-between points on the line: rounding.

function LinFmod(dVal, dFstart, dFend, dLstart, dLend, dLvl, vDec)
{
	if (dLstart-DblCalcDev <= dLvl && dLvl <= dLstart+DblCalcDev)
		return dVal*dFstart;
	else if (dLend-DblCalcDev <= dLvl && dLvl <= dLend+DblCalcDev)
		return dVal*dFend;
	else if (typeof vDec === "undefined")
		return dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart);
	else if (-DblCalcDev <= vDec && vDec <= DblCalcDev)
		return Math.floor(dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart)+0.5+DblCalcDev);
	else
		return Math.floor((dVal*(dFstart*(dLend-dLvl)+(dLvl-dLstart)*dFend)/(dLend-dLstart))*Math.pow(10,vDec)+0.5+DblCalcDev)/Math.pow(10,vDec);
}

// ****************** Parameter "C" decode support functions ******************

// ArmCodeIndex: returns a specified index from an Armour Code.
// sACode string:
// 1st position: H=heavy, M=medium, L=light
// 2nd position: H=head, S=shoulders, CL=cloak/back, C=chest, G=gloves, L=leggings, B=boots, Sh=shield
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic
// Note: no such thing exists as a heavy, medium or light cloak, so no H/M/L in cloak codes (cloaks go automatically in the M class since U23, although historically this was L)

function ArmCodeIndex(sACode, iI)
{
	var armourcode = sACode.trim().toUpperCase();

	// get positional codes and make some corrections
	var sArmClass = armourcode.substr(0,1);
	var sArmType = armourcode.substr(1,1);
	var sArmCol = armourcode.substr(2,1);
	if (sArmType == "S" && sArmCol == "H") {
		sArmType = "SH";
		sArmCol = armourcode.substr(3,1);
	} else if (sArmClass == "C" && sArmType == "L") {
		sArmClass = "M";
		sArmType = "CL";
	} else
		sArmType = " "+sArmType;
	
	switch (iI) {
		case 1:
			var ind = "HML".indexOf(sArmClass);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			var ind = " H SCL C G L BSH".indexOf(sArmType);
			return ((ind == -1) ? 0 : (ind/2)+1);
		case 3:
			var ind = "WYPTG".indexOf(sArmCol);
			return ((ind == -1) ? 0 : ind+1);
		default:
			return 0;
	}
}

// RomanRankDecode: converts a string with a Roman number in characters, to an integer number.
// used for Legendary Item Title calculation.

var RomanRankChars = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
var RomanRankValues = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function RomanRankDecode(sNumber)
{
	if (typeof sNumber === "string") {
		var sn = sNumber.trim().toUpperCase();
		if (sn.length > 0)
			for (ind = 0, len = RomanRankChars.length; ind < len; ind++)
				if (sn.indexOf(RomanRankChars[ind]) == 0)
					return RomanRankValues[ind]+RomanRankDecode(sn.slice(RomanRankChars[ind].length));
	}
	return 0;
}

// ****************** Misc. floating point support functions ******************

// Misc. functions for floating point: rounding etc.
// For roundings: vDec is number of decimals.

function RoundDbl(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return Math.floor(dNum+0.5+DblCalcDev);
	else
		return ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? Math.floor(dNum+0.5+DblCalcDev) : Math.floor(dNum*Math.pow(10,vDec)+0.5+DblCalcDev)/Math.pow(10,vDec));
}

function FloorDbl(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return Math.floor(dNum+DblCalcDev);
	else
		return ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? Math.floor(dNum+DblCalcDev) : Math.floor(dNum*Math.pow(10,vDec)+DblCalcDev)/Math.pow(10,vDec));
}
