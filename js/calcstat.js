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

	if (SN < "PARTBLOCKPRATPCAP") {
		if (SN < "FINESSEPPRAT") {
			if (SN < "CRITDEFPRATPA") {
				if (SN < "BPEPRATPCAP") {
					if (SN < "BLOCKPRATPB") {
						if (SN < "BEORNINGCDCANBLOCK") {
							if (SN < "ADJTRAITPROGRATINGS") {
								if (SN == "-VERSION") {
									return "1.4p";
								} else {
									return 0;
								}
							} else if (SN > "ADJTRAITPROGRATINGS") {
								if (SN == "BEORNINGCDARMOURTYPE") {
									return 3;
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
						} else if (SN > "BEORNINGCDCANBLOCK") {
							if (SN < "BLOCKPPRAT") {
								if (SN == "BLOCKPBONUS") {
									return CalcStat("BPEPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPPRAT") {
								if (SN > "BLOCKPRATP") {
									if (SN == "BLOCKPRATPA") {
										return CalcStat("BPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATP") {
									return CalcStat("BPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPPRat",L,N);
							}
						} else {
							if (L-DblCalcDev <= 5) {
								return 0;
							} else {
								return 1;
							}
						}
					} else if (SN > "BLOCKPRATPB") {
						if (SN < "BPEPPRAT") {
							if (SN < "BLOCKPRATPCAP") {
								if (SN == "BLOCKPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "BLOCKPRATPCAP") {
								if (SN > "BLOCKPRATPCAPR") {
									if (SN == "BPEPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "BLOCKPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCap",L);
							}
						} else if (SN > "BPEPPRAT") {
							if (SN < "BPEPRATPA") {
								if (SN == "BPEPRATP") {
									return CalcPercAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "BPEPRATPA") {
								if (SN > "BPEPRATPB") {
									if (SN == "BPEPRATPC") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPB") {
									return CalcStat("BratLow",L);
								} else {
									return 0;
								}
							} else {
								return 26;
							}
						} else {
							return CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
						}
					} else {
						return CalcStat("BPEPRatPB",L);
					}
				} else if (SN > "BPEPRATPCAP") {
					if (SN < "BRATPARTIAL") {
						if (SN < "BRATMASTERY") {
							if (SN < "BRATHIGH") {
								if (SN == "BPEPRATPCAPR") {
									return CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "BRATHIGH") {
								if (SN == "BRATLOW") {
									return CalcStat("BratProg",L,CalcStat("ProgBLow",L));
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratProg",L,CalcStat("ProgBHigh",L));
							}
						} else if (SN > "BRATMASTERY") {
							if (SN < "BRATMITHEAVY") {
								if (SN == "BRATMEDIUM") {
									return CalcStat("BratProg",L,CalcStat("ProgBMedium",L));
								} else {
									return 0;
								}
							} else if (SN > "BRATMITHEAVY") {
								if (SN > "BRATMITLIGHT") {
									if (SN == "BRATMITMEDIUM") {
										return CalcStat("BratProg",L,CalcStat("ProgBMitMedium",L));
									} else {
										return 0;
									}
								} else if (SN == "BRATMITLIGHT") {
									return CalcStat("BratProg",L,CalcStat("ProgBMitLight",L));
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratProg",L,CalcStat("ProgBMitHeavy",L));
							}
						} else {
							return CalcStat("BratProg",L,CalcStat("ProgBMastery",L));
						}
					} else if (SN > "BRATPARTIAL") {
						if (SN < "CHAMPIONCDARMOURTYPE") {
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
						} else if (SN > "CHAMPIONCDARMOURTYPE") {
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
								if (SN > "CRITDEFPPRAT") {
									if (SN == "CRITDEFPRATP") {
										return CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPPRAT") {
									return CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							return 3;
						}
					} else {
						return CalcStat("BratProg",L,CalcStat("ProgBPartial",L));
					}
				} else {
					return 13;
				}
			} else if (SN > "CRITDEFPRATPA") {
				if (SN < "CRITMAGNPRATPCAP") {
					if (SN < "CRITHITPRATPB") {
						if (SN < "CRITDEFPRATPCAPR") {
							if (SN < "CRITDEFPRATPC") {
								if (SN == "CRITDEFPRATPB") {
									return CalcStat("BratLow",L);
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPRATPC") {
								if (SN == "CRITDEFPRATPCAP") {
									return 80;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else if (SN > "CRITDEFPRATPCAPR") {
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
						} else {
							return CalcStat("CritDefPRatPB",L)*CalcStat("CritDefPRatPC",L);
						}
					} else if (SN > "CRITHITPRATPB") {
						if (SN < "CRITMAGNPPRAT") {
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
						} else if (SN > "CRITMAGNPPRAT") {
							if (SN < "CRITMAGNPRATPA") {
								if (SN == "CRITMAGNPRATP") {
									return CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPA") {
								if (SN > "CRITMAGNPRATPB") {
									if (SN == "CRITMAGNPRATPC") {
										return CalcStat("CritMagnPRatPCap",L)/(CalcStat("CritMagnPRatPA",L)-CalcStat("CritMagnPRatPCap",L));
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPRATPB") {
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
						} else {
							return CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
						}
					} else {
						return CalcStat("BratLow",L);
					}
				} else if (SN > "CRITMAGNPRATPCAP") {
					if (SN < "DEVHITPRATPCAPR") {
						if (SN < "DEVHITPRATP") {
							if (SN < "DEVHITPBONUS") {
								if (SN == "CRITMAGNPRATPCAPR") {
									return CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPBONUS") {
								if (SN == "DEVHITPPRAT") {
									return CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "DEVHITPRATP") {
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
						} else {
							return CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
						}
					} else if (SN > "DEVHITPRATPCAPR") {
						if (SN < "EVADEPRATPB") {
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
						} else if (SN > "EVADEPRATPB") {
							if (SN < "EVADEPRATPCAP") {
								if (SN == "EVADEPRATPC") {
									return CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPRATPCAP") {
								if (SN > "EVADEPRATPCAPR") {
									if (SN == "FINESSEPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPCAPR") {
									return CalcStat("BPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPCap",L);
							}
						} else {
							return CalcStat("BPEPRatPB",L);
						}
					} else {
						return CalcStat("DevHitPRatPB",L)*CalcStat("DevHitPRatPC",L);
					}
				} else {
					if (L-DblCalcDev <= 120) {
						return 100;
					} else {
						return 75;
					}
				}
			} else {
				return 160;
			}
		} else if (SN > "FINESSEPPRAT") {
			if (SN < "MITMEDIUMPBONUS") {
				if (SN < "LOREMASTERCDARMOURTYPE") {
					if (SN < "HUNTERCDARMOURTYPE") {
						if (SN < "FINESSEPRATPC") {
							if (SN < "FINESSEPRATPA") {
								if (SN == "FINESSEPRATP") {
									return CalcPercAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATPA") {
								if (SN == "FINESSEPRATPB") {
									return CalcStat("BratLow",L);
								} else {
									return 0;
								}
							} else {
								return 100;
							}
						} else if (SN > "FINESSEPRATPC") {
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
						} else {
							return 1;
						}
					} else if (SN > "HUNTERCDARMOURTYPE") {
						if (SN < "INHEALPRATPB") {
							if (SN < "INHEALPPRAT") {
								if (SN == "INHEALPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "INHEALPPRAT") {
								if (SN > "INHEALPRATP") {
									if (SN == "INHEALPRATPA") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "INHEALPRATP") {
									return CalcPercAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("InHealPRatPA",L),CalcStat("InHealPRatPB",L),CalcStat("InHealPRatPCapR",L),N);
							}
						} else if (SN > "INHEALPRATPB") {
							if (SN < "INHEALPRATPCAP") {
								if (SN == "INHEALPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "INHEALPRATPCAP") {
								if (SN > "INHEALPRATPCAPR") {
									if (SN == "LEVELCAP") {
										return 130;
									} else {
										return 0;
									}
								} else if (SN == "INHEALPRATPCAPR") {
									return CalcStat("InHealPRatPB",L)*CalcStat("InHealPRatPC",L);
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
						return 2;
					}
				} else if (SN > "LOREMASTERCDARMOURTYPE") {
					if (SN < "MITHEAVYPRATPCAP") {
						if (SN < "MITHEAVYPPRAT") {
							if (SN < "MINSTRELCDCANBLOCK") {
								if (SN == "MINSTRELCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "MINSTRELCDCANBLOCK") {
								if (SN == "MITHEAVYPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 19) {
									return 0;
								} else {
									return 1;
								}
							}
						} else if (SN > "MITHEAVYPPRAT") {
							if (SN < "MITHEAVYPRATPA") {
								if (SN == "MITHEAVYPRATP") {
									return CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATPA") {
								if (SN > "MITHEAVYPRATPB") {
									if (SN == "MITHEAVYPRATPC") {
										return 1.2;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPB") {
									return CalcStat("BratMitHeavy",L);
								} else {
									return 0;
								}
							} else {
								return 110;
							}
						} else {
							return CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
						}
					} else if (SN > "MITHEAVYPRATPCAP") {
						if (SN < "MITLIGHTPRATPA") {
							if (SN < "MITLIGHTPBONUS") {
								if (SN == "MITHEAVYPRATPCAPR") {
									return CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPBONUS") {
								if (SN > "MITLIGHTPPRAT") {
									if (SN == "MITLIGHTPRATP") {
										return CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPPRAT") {
									return CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "MITLIGHTPRATPA") {
							if (SN < "MITLIGHTPRATPC") {
								if (SN == "MITLIGHTPRATPB") {
									return CalcStat("BratMitLight",L);
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPRATPC") {
								if (SN > "MITLIGHTPRATPCAP") {
									if (SN == "MITLIGHTPRATPCAPR") {
										return CalcStat("MitLightPRatPB",L)*CalcStat("MitLightPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPRATPCAP") {
									return 40;
								} else {
									return 0;
								}
							} else {
								return 1.6;
							}
						} else {
							return 65;
						}
					} else {
						return 60;
					}
				} else {
					return 1;
				}
			} else if (SN > "MITMEDIUMPBONUS") {
				if (SN < "PARRYPRATPA") {
					if (SN < "OUTHEALPPRAT") {
						if (SN < "MITMEDIUMPRATPB") {
							if (SN < "MITMEDIUMPRATP") {
								if (SN == "MITMEDIUMPPRAT") {
									return CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATP") {
								if (SN == "MITMEDIUMPRATPA") {
									return 85;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
							}
						} else if (SN > "MITMEDIUMPRATPB") {
							if (SN < "MITMEDIUMPRATPCAP") {
								if (SN == "MITMEDIUMPRATPC") {
									return 10/7;
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATPCAP") {
								if (SN > "MITMEDIUMPRATPCAPR") {
									if (SN == "OUTHEALPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPCAPR") {
									return CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 50;
							}
						} else {
							return CalcStat("BratMitMedium",L);
						}
					} else if (SN > "OUTHEALPPRAT") {
						if (SN < "OUTHEALPRATPCAP") {
							if (SN < "OUTHEALPRATPA") {
								if (SN == "OUTHEALPRATP") {
									return CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPRATPA") {
								if (SN > "OUTHEALPRATPB") {
									if (SN == "OUTHEALPRATPC") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATPB") {
									return CalcStat("BratMedium",L);
								} else {
									return 0;
								}
							} else {
								return 140;
							}
						} else if (SN > "OUTHEALPRATPCAP") {
							if (SN < "PARRYPBONUS") {
								if (SN == "OUTHEALPRATPCAPR") {
									return CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPBONUS") {
								if (SN > "PARRYPPRAT") {
									if (SN == "PARRYPRATP") {
										return CalcStat("BPEPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPPRAT") {
									return CalcStat("BPEPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPBonus",L);
							}
						} else {
							return 70;
						}
					} else {
						return CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
					}
				} else if (SN > "PARRYPRATPA") {
					if (SN < "PARTBLOCKMITPRATPB") {
						if (SN < "PARRYPRATPCAPR") {
							if (SN < "PARRYPRATPC") {
								if (SN == "PARRYPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATPC") {
								if (SN == "PARRYPRATPCAP") {
									return CalcStat("BPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPC",L);
							}
						} else if (SN > "PARRYPRATPCAPR") {
							if (SN < "PARTBLOCKMITPPRAT") {
								if (SN == "PARTBLOCKMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPPRAT") {
								if (SN > "PARTBLOCKMITPRATP") {
									if (SN == "PARTBLOCKMITPRATPA") {
										return CalcStat("PartMitPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPPRat",L,N);
							}
						} else {
							return CalcStat("BPEPRatPCapR",L);
						}
					} else if (SN > "PARTBLOCKMITPRATPB") {
						if (SN < "PARTBLOCKPPRAT") {
							if (SN < "PARTBLOCKMITPRATPCAP") {
								if (SN == "PARTBLOCKMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPRATPCAP") {
								if (SN > "PARTBLOCKMITPRATPCAPR") {
									if (SN == "PARTBLOCKPBONUS") {
										return CalcStat("PartBPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPCap",L);
							}
						} else if (SN > "PARTBLOCKPPRAT") {
							if (SN < "PARTBLOCKPRATPA") {
								if (SN == "PARTBLOCKPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPRATPA") {
								if (SN > "PARTBLOCKPRATPB") {
									if (SN == "PARTBLOCKPRATPC") {
										return CalcStat("PartBPEPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPA",L);
							}
						} else {
							return CalcStat("PartBPEPPRat",L,N);
						}
					} else {
						return CalcStat("PartMitPRatPB",L);
					}
				} else {
					return CalcStat("BPEPRatPA",L);
				}
			} else {
				return 0;
			}
		} else {
			return CalcRatAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCapR",L),N);
		}
	} else if (SN > "PARTBLOCKPRATPCAP") {
		if (SN < "PHYMITMPRATP") {
			if (SN < "PARTPARRYMITPRATPB") {
				if (SN < "PARTEVADEPPRAT") {
					if (SN < "PARTBPEPRATPCAPR") {
						if (SN < "PARTBPEPRATP") {
							if (SN < "PARTBPEPBONUS") {
								if (SN == "PARTBLOCKPRATPCAPR") {
									return CalcStat("PartBPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPBONUS") {
								if (SN == "PARTBPEPPRAT") {
									return CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "PARTBPEPRATP") {
							if (SN < "PARTBPEPRATPB") {
								if (SN == "PARTBPEPRATPA") {
									return 70;
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPRATPB") {
								if (SN > "PARTBPEPRATPC") {
									if (SN == "PARTBPEPRATPCAP") {
										return 35;
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratPartial",L);
							}
						} else {
							return CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
						}
					} else if (SN > "PARTBPEPRATPCAPR") {
						if (SN < "PARTEVADEMITPRATPB") {
							if (SN < "PARTEVADEMITPPRAT") {
								if (SN == "PARTEVADEMITPBONUS") {
									if (L-DblCalcDev <= 1) {
										return 35;
									} else {
										return CalcStat("PartMitPBonus",L);
									}
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEMITPPRAT") {
								if (SN > "PARTEVADEMITPRATP") {
									if (SN == "PARTEVADEMITPRATPA") {
										return CalcStat("PartMitPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPPRat",L,N);
							}
						} else if (SN > "PARTEVADEMITPRATPB") {
							if (SN < "PARTEVADEMITPRATPCAP") {
								if (SN == "PARTEVADEMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEMITPRATPCAP") {
								if (SN > "PARTEVADEMITPRATPCAPR") {
									if (SN == "PARTEVADEPBONUS") {
										return CalcStat("PartBPEPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPCap",L);
							}
						} else {
							return CalcStat("PartMitPRatPB",L);
						}
					} else {
						return CalcStat("PartBPEPRatPB",L)*CalcStat("PartBPEPRatPC",L);
					}
				} else if (SN > "PARTEVADEPPRAT") {
					if (SN < "PARTMITPRATP") {
						if (SN < "PARTEVADEPRATPC") {
							if (SN < "PARTEVADEPRATPA") {
								if (SN == "PARTEVADEPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPRATPA") {
								if (SN == "PARTEVADEPRATPB") {
									return CalcStat("PartBPEPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPA",L);
							}
						} else if (SN > "PARTEVADEPRATPC") {
							if (SN < "PARTEVADEPRATPCAPR") {
								if (SN == "PARTEVADEPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPRATPCAPR") {
								if (SN > "PARTMITPBONUS") {
									if (SN == "PARTMITPPRAT") {
										return CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPBONUS") {
									return 10;
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCapR",L);
							}
						} else {
							return CalcStat("PartBPEPRatPC",L);
						}
					} else if (SN > "PARTMITPRATP") {
						if (SN < "PARTMITPRATPCAPR") {
							if (SN < "PARTMITPRATPB") {
								if (SN == "PARTMITPRATPA") {
									return 100;
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATPB") {
								if (SN > "PARTMITPRATPC") {
									if (SN == "PARTMITPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratPartial",L);
							}
						} else if (SN > "PARTMITPRATPCAPR") {
							if (SN < "PARTPARRYMITPPRAT") {
								if (SN == "PARTPARRYMITPBONUS") {
									return CalcStat("PartMitPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPPRAT") {
								if (SN > "PARTPARRYMITPRATP") {
									if (SN == "PARTPARRYMITPRATPA") {
										return CalcStat("PartMitPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPPRat",L,N);
							}
						} else {
							return CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
						}
					} else {
						return CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
					}
				} else {
					return CalcStat("PartBPEPPRat",L,N);
				}
			} else if (SN > "PARTPARRYMITPRATPB") {
				if (SN < "PHYDMGPRATPCAPR") {
					if (SN < "PARTPARRYPRATPC") {
						if (SN < "PARTPARRYPBONUS") {
							if (SN < "PARTPARRYMITPRATPCAP") {
								if (SN == "PARTPARRYMITPRATPC") {
									return CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPRATPCAP") {
								if (SN == "PARTPARRYMITPRATPCAPR") {
									return CalcStat("PartMitPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPCap",L);
							}
						} else if (SN > "PARTPARRYPBONUS") {
							if (SN < "PARTPARRYPRATP") {
								if (SN == "PARTPARRYPPRAT") {
									return CalcStat("PartBPEPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATP") {
								if (SN > "PARTPARRYPRATPA") {
									if (SN == "PARTPARRYPRATPB") {
										return CalcStat("PartBPEPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYPRATPA") {
									return CalcStat("PartBPEPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatP",L,N);
							}
						} else {
							return CalcStat("PartBPEPBonus",L);
						}
					} else if (SN > "PARTPARRYPRATPC") {
						if (SN < "PHYDMGPRATP") {
							if (SN < "PARTPARRYPRATPCAPR") {
								if (SN == "PARTPARRYPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATPCAPR") {
								if (SN > "PHYDMGPBONUS") {
									if (SN == "PHYDMGPPRAT") {
										return CalcRatAB(CalcStat("PhyDmgPRatPA",L),CalcStat("PhyDmgPRatPB",L),CalcStat("PhyDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCapR",L);
							}
						} else if (SN > "PHYDMGPRATP") {
							if (SN < "PHYDMGPRATPB") {
								if (SN == "PHYDMGPRATPA") {
									return 400;
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATPB") {
								if (SN > "PHYDMGPRATPC") {
									if (SN == "PHYDMGPRATPCAP") {
										return 200;
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratMastery",L);
							}
						} else {
							return CalcPercAB(CalcStat("PhyDmgPRatPA",L),CalcStat("PhyDmgPRatPB",L),CalcStat("PhyDmgPRatPCap",L),N);
						}
					} else {
						return CalcStat("PartBPEPRatPC",L);
					}
				} else if (SN > "PHYDMGPRATPCAPR") {
					if (SN < "PHYMITLPBONUS") {
						if (SN < "PHYMITHPRATPA") {
							if (SN < "PHYMITHPPRAT") {
								if (SN == "PHYMITHPBONUS") {
									return CalcStat("MitHeavyPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPPRAT") {
								if (SN == "PHYMITHPRATP") {
									return CalcStat("MitHeavyPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPPRat",L,N);
							}
						} else if (SN > "PHYMITHPRATPA") {
							if (SN < "PHYMITHPRATPC") {
								if (SN == "PHYMITHPRATPB") {
									return CalcStat("MitHeavyPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPRATPC") {
								if (SN > "PHYMITHPRATPCAP") {
									if (SN == "PHYMITHPRATPCAPR") {
										return CalcStat("MitHeavyPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATPCAP") {
									return CalcStat("MitHeavyPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPC",L);
							}
						} else {
							return CalcStat("MitHeavyPRatPA",L);
						}
					} else if (SN > "PHYMITLPBONUS") {
						if (SN < "PHYMITLPRATPC") {
							if (SN < "PHYMITLPRATP") {
								if (SN == "PHYMITLPPRAT") {
									return CalcStat("MitLightPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATP") {
								if (SN > "PHYMITLPRATPA") {
									if (SN == "PHYMITLPRATPB") {
										return CalcStat("MitLightPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATPA") {
									return CalcStat("MitLightPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatP",L,N);
							}
						} else if (SN > "PHYMITLPRATPC") {
							if (SN < "PHYMITLPRATPCAPR") {
								if (SN == "PHYMITLPRATPCAP") {
									return CalcStat("MitLightPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATPCAPR") {
								if (SN > "PHYMITMPBONUS") {
									if (SN == "PHYMITMPPRAT") {
										return CalcStat("MitMediumPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITMPBONUS") {
									return CalcStat("MitMediumPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPCapR",L);
							}
						} else {
							return CalcStat("MitLightPRatPC",L);
						}
					} else {
						return CalcStat("MitLightPBonus",L);
					}
				} else {
					return CalcStat("PhyDmgPRatPB",L)*CalcStat("PhyDmgPRatPC",L);
				}
			} else {
				return CalcStat("PartMitPRatPB",L);
			}
		} else if (SN > "PHYMITMPRATP") {
			if (SN < "TACDMGPPRAT") {
				if (SN < "PROGEXTCOMLOWRAW") {
					if (SN < "PROGBHIGH") {
						if (SN < "PHYMITMPRATPCAP") {
							if (SN < "PHYMITMPRATPB") {
								if (SN == "PHYMITMPRATPA") {
									return CalcStat("MitMediumPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPRATPB") {
								if (SN == "PHYMITMPRATPC") {
									return CalcStat("MitMediumPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPB",L);
							}
						} else if (SN > "PHYMITMPRATPCAP") {
							if (SN < "PHYMITT") {
								if (SN == "PHYMITMPRATPCAPR") {
									return CalcStat("MitMediumPRatPCapR",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITT") {
								if (SN > "PNTMPDEFENCE") {
									if (SN == "PNTMPPHYMIT") {
										return 45/380;
									} else {
										return 0;
									}
								} else if (SN == "PNTMPDEFENCE") {
									return 390/13000;
								} else {
									return 0;
								}
							} else {
								return CalcStat("PntMPPhyMit",L)*CalcStat("TraitProg",L,CalcStat("ProgBMitigation",L))*CalcStat("AdjTraitProgRatings",L,CalcStat("ProgBMitigation",L))*N;
							}
						} else {
							return CalcStat("MitMediumPRatPCap",L);
						}
					} else if (SN > "PROGBHIGH") {
						if (SN < "PROGBMITIGATION") {
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
						} else if (SN > "PROGBMITIGATION") {
							if (SN < "PROGBMITMEDIUM") {
								if (SN == "PROGBMITLIGHT") {
									return 280/3;
								} else {
									return 0;
								}
							} else if (SN > "PROGBMITMEDIUM") {
								if (SN > "PROGBPARTIAL") {
									if (SN == "PROGEXTCOMHIGHRAW") {
										if (L-DblCalcDev <= 121) {
											return ExpFmod(N,121,20,L);
										} else if (L-DblCalcDev <= 125) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",121,N),122,5.5,L);
										} else if (L-DblCalcDev <= 126) {
											return ExpFmod(CalcStat("ProgExtComHighRaw",125,N),126,20,L);
										} else {
											return ExpFmod(CalcStat("ProgExtComHighRaw",126,N),127,5.5,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "PROGBPARTIAL") {
									return 350;
								} else {
									return 0;
								}
							} else {
								return 382/3;
							}
						} else {
							return CalcStat("ProgBMitMedium",L);
						}
					} else {
						return 500;
					}
				} else if (SN > "PROGEXTCOMLOWRAW") {
					if (SN < "RESISTPRATPCAPR") {
						if (SN < "RESISTPRATP") {
							if (SN < "RESISTPBONUS") {
								if (SN == "RATDEFENCET") {
									return CalcStat("PntMPDefence",L)*CalcStat("TraitProg",L,CalcStat("ProgBMedium",L))*CalcStat("AdjTraitProgRatings",L,CalcStat("ProgBMedium",L))*N;
								} else {
									return 0;
								}
							} else if (SN > "RESISTPBONUS") {
								if (SN == "RESISTPPRAT") {
									return CalcRatAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "RESISTPRATP") {
							if (SN < "RESISTPRATPB") {
								if (SN == "RESISTPRATPA") {
									return 100;
								} else {
									return 0;
								}
							} else if (SN > "RESISTPRATPB") {
								if (SN > "RESISTPRATPC") {
									if (SN == "RESISTPRATPCAP") {
										return 50;
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATPC") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BratLow",L);
							}
						} else {
							return CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
						}
					} else if (SN > "RESISTPRATPCAPR") {
						if (SN < "T2PENARMOUR") {
							if (SN < "RUNEKEEPERCDARMOURTYPE") {
								if (SN == "RESISTT") {
									return CalcStat("RatDefenceT",L,N);
								} else {
									return 0;
								}
							} else if (SN > "RUNEKEEPERCDARMOURTYPE") {
								if (SN > "STATPROG") {
									if (SN == "STDPROG") {
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
									} else {
										return 0;
									}
								} else if (SN == "STATPROG") {
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
							} else {
								return 1;
							}
						} else if (SN > "T2PENARMOUR") {
							if (SN < "T2PENMIT") {
								if (SN == "T2PENBPE") {
									if (L-DblCalcDev <= 115) {
										return (-40)*L;
									} else {
										return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenBPE",115));
									}
								} else {
									return 0;
								}
							} else if (SN > "T2PENMIT") {
								if (SN > "T2PENRESIST") {
									if (SN == "TACDMGPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "T2PENRESIST") {
									if (L-DblCalcDev <= 115) {
										return (-90)*L;
									} else {
										return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenResist",115));
									}
								} else {
									return 0;
								}
							} else {
								if (L-DblCalcDev <= 115) {
									return FloorDbl(L*13.5)*-5;
								} else {
									return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenMit",115));
								}
							}
						} else {
							return CalcStat("T2penMit",L);
						}
					} else {
						return CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
					}
				} else {
					if (L-DblCalcDev <= 116) {
						return ExpFmod(N,116,20,L);
					} else if (L-DblCalcDev <= 120) {
						return ExpFmod(CalcStat("ProgExtComLowRaw",116,N),117,5.5,L);
					} else {
						return CalcStat("ProgExtComHighRaw",L,CalcStat("ProgExtComLowRaw",120,N));
					}
				}
			} else if (SN > "TACDMGPPRAT") {
				if (SN < "TACMITLPRATPB") {
					if (SN < "TACMITHPRATP") {
						if (SN < "TACDMGPRATPC") {
							if (SN < "TACDMGPRATPA") {
								if (SN == "TACDMGPRATP") {
									return CalcPercAB(CalcStat("TacDmgPRatPA",L),CalcStat("TacDmgPRatPB",L),CalcStat("TacDmgPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPRATPA") {
								if (SN == "TACDMGPRATPB") {
									return CalcStat("BratMastery",L);
								} else {
									return 0;
								}
							} else {
								return 400;
							}
						} else if (SN > "TACDMGPRATPC") {
							if (SN < "TACDMGPRATPCAPR") {
								if (SN == "TACDMGPRATPCAP") {
									return 200;
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPRATPCAPR") {
								if (SN > "TACMITHPBONUS") {
									if (SN == "TACMITHPPRAT") {
										return CalcStat("MitHeavyPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPBONUS") {
									return CalcStat("MitHeavyPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("TacDmgPRatPB",L)*CalcStat("TacDmgPRatPC",L);
							}
						} else {
							return 1;
						}
					} else if (SN > "TACMITHPRATP") {
						if (SN < "TACMITHPRATPCAPR") {
							if (SN < "TACMITHPRATPB") {
								if (SN == "TACMITHPRATPA") {
									return CalcStat("MitHeavyPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITHPRATPB") {
								if (SN > "TACMITHPRATPC") {
									if (SN == "TACMITHPRATPCAP") {
										return CalcStat("MitHeavyPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITHPRATPC") {
									return CalcStat("MitHeavyPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPB",L);
							}
						} else if (SN > "TACMITHPRATPCAPR") {
							if (SN < "TACMITLPPRAT") {
								if (SN == "TACMITLPBONUS") {
									return CalcStat("MitLightPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPPRAT") {
								if (SN > "TACMITLPRATP") {
									if (SN == "TACMITLPRATPA") {
										return CalcStat("MitLightPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "TACMITLPRATP") {
									return CalcStat("MitLightPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPPRat",L,N);
							}
						} else {
							return CalcStat("MitHeavyPRatPCapR",L);
						}
					} else {
						return CalcStat("MitHeavyPRatP",L,N);
					}
				} else if (SN > "TACMITLPRATPB") {
					if (SN < "TACMITMPRATPC") {
						if (SN < "TACMITMPBONUS") {
							if (SN < "TACMITLPRATPCAP") {
								if (SN == "TACMITLPRATPC") {
									return CalcStat("MitLightPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "TACMITLPRATPCAP") {
								if (SN == "TACMITLPRATPCAPR") {
									return CalcStat("MitLightPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPCap",L);
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
									return CalcStat("TpenChoice",N)*CalcStat("PhyMitT",L,5/3);
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
					return CalcStat("MitLightPRatPB",L);
				}
			} else {
				return CalcRatAB(CalcStat("TacDmgPRatPA",L),CalcStat("TacDmgPRatPB",L),CalcStat("TacDmgPRatPCapR",L),N);
			}
		} else {
			return CalcStat("MitMediumPRatP",L,N);
		}
	} else {
		return CalcStat("PartBPEPRatPCap",L);
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

function ExpFmod(dVal, dLstart, dPlvl, dLvl, vDec)
{
	if (dLvl-dLstart+1 <= DblCalcDev)
		return dVal;
	else if (typeof vDec === "undefined")
		return dVal*Math.pow(1+dPlvl/100,dLvl-dLstart+1);
	else {
		var dResult = dVal;
		var dDec = ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? 1 : Math.pow(10,vDec));
		var dFac = (1+dPlvl/100)*dDec;
		var dAdd = 0.5+DblCalcDev;
		var dL = dLstart-DblCalcDev;
		while (dL++ <= dLvl)
			dResult = Math.floor(dResult*dFac+dAdd)/dDec;
		return dResult;
	}
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
