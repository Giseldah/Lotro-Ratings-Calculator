// Created by Giseldah

// Floating point numbers bring errors into the calculation, both inside the Lotro-client and in this function collection. This is why a 100% match with the stats in Lotro is impossible.
// Anyway, to compensate for some errors, we use a calculation deviation correction value. This makes for instance 24.49999999 round to 25, as it's assumed that 24.5 was intended as outcome of a formula.
var DblCalcDev = 0.00000001;

function CalcStat(SName, SLvl, SParam)
{
	var SN = SName.trim().toUpperCase();
	var L = SLvl;
	var Lm = L-DblCalcDev;
	var Lp = L+DblCalcDev;
	var N = 1;
	var C = "";
	if (typeof SParam !== "undefined") {
		if (typeof SParam === "number")
			N = SParam;
		else if (typeof SParam === "string")
			C = SParam;
	}

	if (SN < "PARRYPRATPA") {
		if (SN < "FINESSEPBONUS") {
			if (SN < "CHAMPIONCDHASPOWER") {
				if (SN < "BPEPRATPCAP") {
					if (SN < "BLOCKPRATPB") {
						if (SN < "BEORNINGCDCANBLOCK") {
							if (SN < "ARMOURPENT") {
								if (SN == "-VERSION") {
									return "2.2rc1p";
								} else {
									return 0;
								}
							} else if (SN > "ARMOURPENT") {
								if (SN > "ARMOURPENTADJ") {
									if (SN == "BEORNINGCDARMOURTYPE") {
										return 3;
									} else {
										return 0;
									}
								} else if (SN == "ARMOURPENTADJ") {
									if (Lm <= 49) {
										return 1;
									} else if (Lm <= 50) {
										return 0.8;
									} else {
										return 1;
									}
								} else {
									return 0;
								}
							} else {
								return StatLinInter("PntMPArmourPenT","TraitProg","ProgBArmour","ArmourPenTAdj",L,N,0);
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
							if (Lm <= 5) {
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
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "BPEPRATPB") {
									return CalcStat("BRatRounded",L,"BRat1Tier");
								} else {
									return 0;
								}
							} else {
								return 39;
							}
						} else {
							return CalcRatAB(CalcStat("BPEPRatPA",L),CalcStat("BPEPRatPB",L),CalcStat("BPEPRatPCapR",L),N);
						}
					} else {
						return CalcStat("BPEPRatPB",L);
					}
				} else if (SN > "BPEPRATPCAP") {
					if (SN < "BRATMITMEDIUM") {
						if (SN < "BRAT3TIER") {
							if (SN < "BPET") {
								if (SN == "BPEPRATPCAPR") {
									return CalcStat("BPEPRatPB",L)*CalcStat("BPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "BPET") {
								if (SN > "BRAT1TIER") {
									if (SN == "BRAT2TIER") {
										if (Lm <= 50) {
											return LinFmod(1,300,3000,1,50,L,0);
										} else if (Lm <= 60) {
											return LinFmod(1,3000,4500,50,60,L);
										} else if (Lm <= 65) {
											return LinFmod(1,4500,6000,60,65,L);
										} else if (Lm <= 75) {
											return LinFmod(1,6000,9000,65,75,L);
										} else if (Lm <= 85) {
											return LinFmod(1,9000,13500,75,85,L);
										} else if (Lm <= 95) {
											return LinFmod(1,13500,19500,85,95,L);
										} else if (Lm <= 100) {
											return LinFmod(1,19500,27100,95,100,L);
										} else if (Lm <= 105) {
											return LinFmod(1,27100,36000,100,105,L);
										} else if (Lm <= 115) {
											return LinFmod(1,40000,54000,106,115,L);
										} else if (Lm <= 120) {
											return LinFmod(1,62000,68000,116,120,L);
										} else if (Lm <= 130) {
											return LinFmod(1,78000,102000,121,130,L);
										} else if (Lm <= 140) {
											return LinFmod(1,117000,204000,131,140,L);
										} else {
											return LinFmod(1,235000,410000,141,150,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "BRAT1TIER") {
									if (Lm <= 50) {
										return LinFmod(1,200,2000,1,50,L,0);
									} else if (Lm <= 60) {
										return LinFmod(1,2000,3000,50,60,L);
									} else if (Lm <= 65) {
										return LinFmod(1,3000,4000,60,65,L);
									} else if (Lm <= 75) {
										return LinFmod(1,4000,6000,65,75,L);
									} else if (Lm <= 85) {
										return LinFmod(1,6000,9000,75,85,L);
									} else if (Lm <= 95) {
										return LinFmod(1,9000,13000,85,95,L);
									} else if (Lm <= 100) {
										return LinFmod(1,13000,18100,95,100,L);
									} else if (Lm <= 105) {
										return LinFmod(1,18100,24100,100,105,L);
									} else if (Lm <= 115) {
										return LinFmod(1,26500,36000,106,115,L);
									} else if (Lm <= 120) {
										return LinFmod(1,41000,45000,116,120,L);
									} else if (Lm <= 130) {
										return LinFmod(1,52000,68000,121,130,L);
									} else if (Lm <= 140) {
										return LinFmod(1,78000,136000,131,140,L);
									} else {
										return LinFmod(1,156000,272000,141,150,L);
									}
								} else {
									return 0;
								}
							} else {
								return StatLinInter("PntMPBPE","TraitProg","ProgBBPE","",L,N,0);
							}
						} else if (SN > "BRAT3TIER") {
							if (SN < "BRAT5TIER") {
								if (SN == "BRAT4TIER") {
									if (Lm <= 50) {
										return LinFmod(1,400,4000,1,50,L,0);
									} else if (Lm <= 60) {
										return LinFmod(1,4000,6000,50,60,L);
									} else if (Lm <= 65) {
										return LinFmod(1,6000,8000,60,65,L);
									} else if (Lm <= 75) {
										return LinFmod(1,8000,12000,65,75,L);
									} else if (Lm <= 85) {
										return LinFmod(1,12000,18000,75,85,L);
									} else if (Lm <= 95) {
										return LinFmod(1,18000,26000,85,95,L);
									} else if (Lm <= 100) {
										return LinFmod(1,26000,36000,95,100,L);
									} else if (Lm <= 105) {
										return LinFmod(1,36000,48000,100,105,L);
									} else if (Lm <= 115) {
										return LinFmod(1,53000,72000,106,115,L);
									} else if (Lm <= 120) {
										return LinFmod(1,83000,90000,116,120,L);
									} else if (Lm <= 130) {
										return LinFmod(1,104000,135000,121,130,L);
									} else if (Lm <= 140) {
										return LinFmod(1,155000,270000,131,140,L);
									} else {
										return LinFmod(1,311000,540000,141,150,L);
									}
								} else {
									return 0;
								}
							} else if (SN > "BRAT5TIER") {
								if (SN > "BRATMITHEAVY") {
									if (SN == "BRATMITLIGHT") {
										if (Lm <= 50) {
											return LinFmod(1,105,1330,1,50,L,0);
										} else if (Lm <= 60) {
											return LinFmod(1,1330,2000,50,60,L);
										} else if (Lm <= 65) {
											return LinFmod(1,2000,2660,60,65,L);
										} else if (Lm <= 75) {
											return LinFmod(1,2660,4000,65,75,L);
										} else if (Lm <= 85) {
											return LinFmod(1,4000,6000,75,85,L);
										} else if (Lm <= 95) {
											return LinFmod(1,6000,8700,85,95,L);
										} else if (Lm <= 100) {
											return LinFmod(1,8700,12100,95,100,L);
										} else if (Lm <= 105) {
											return LinFmod(1,12100,16100,100,105,L);
										} else if (Lm <= 115) {
											return LinFmod(1,17600,24000,106,115,L);
										} else if (Lm <= 120) {
											return LinFmod(1,27300,30000,116,120,L);
										} else if (Lm <= 130) {
											return LinFmod(1,35000,45000,121,130,L);
										} else if (Lm <= 140) {
											return LinFmod(1,52000,91000,131,140,L);
										} else {
											return LinFmod(1,104000,181000,141,150,L);
										}
									} else {
										return 0;
									}
								} else if (SN == "BRATMITHEAVY") {
									if (Lm <= 50) {
										return LinFmod(1,200,2000,1,50,L,0);
									} else if (Lm <= 60) {
										return LinFmod(1,2000,3000,50,60,L);
									} else if (Lm <= 65) {
										return LinFmod(1,3000,4000,60,65,L);
									} else if (Lm <= 75) {
										return LinFmod(1,4000,6000,65,75,L);
									} else if (Lm <= 85) {
										return LinFmod(1,6000,9000,75,85,L);
									} else if (Lm <= 95) {
										return LinFmod(1,9000,13000,85,95,L);
									} else if (Lm <= 100) {
										return LinFmod(1,13000,18100,95,100,L);
									} else if (Lm <= 105) {
										return LinFmod(1,18100,24100,100,105,L);
									} else if (Lm <= 115) {
										return LinFmod(1,26500,36000,106,115,L);
									} else if (Lm <= 120) {
										return LinFmod(1,41000,45000,116,120,L);
									} else if (Lm <= 130) {
										return LinFmod(1,52000,68000,121,130,L);
									} else if (Lm <= 140) {
										return LinFmod(1,78000,136000,131,140,L);
									} else {
										return LinFmod(1,156000,272000,141,150,L);
									}
								} else {
									return 0;
								}
							} else {
								if (Lm <= 50) {
									return LinFmod(1,700,7000,1,50,L,0);
								} else if (Lm <= 60) {
									return LinFmod(1,7000,10500,50,60,L);
								} else if (Lm <= 65) {
									return LinFmod(1,10500,14000,60,65,L);
								} else if (Lm <= 75) {
									return LinFmod(1,14000,21000,65,75,L);
								} else if (Lm <= 85) {
									return LinFmod(1,21000,31500,75,85,L);
								} else if (Lm <= 95) {
									return LinFmod(1,31500,46000,85,95,L);
								} else if (Lm <= 100) {
									return LinFmod(1,46000,64000,95,100,L);
								} else if (Lm <= 105) {
									return LinFmod(1,64000,85000,100,105,L);
								} else if (Lm <= 115) {
									return LinFmod(1,94000,128000,106,115,L);
								} else if (Lm <= 120) {
									return LinFmod(1,147000,160000,116,120,L);
								} else if (Lm <= 130) {
									return LinFmod(1,184000,240000,121,130,L);
								} else if (Lm <= 140) {
									return LinFmod(1,276000,480000,131,140,L);
								} else {
									return LinFmod(1,552000,960000,141,150,L);
								}
							}
						} else {
							if (Lm <= 50) {
								return LinFmod(1,350,3500,1,50,L,0);
							} else if (Lm <= 60) {
								return LinFmod(1,3500,5300,50,60,L);
							} else if (Lm <= 65) {
								return LinFmod(1,5300,7100,60,65,L);
							} else if (Lm <= 75) {
								return LinFmod(1,7100,10700,65,75,L);
							} else if (Lm <= 85) {
								return LinFmod(1,10700,16100,75,85,L);
							} else if (Lm <= 95) {
								return LinFmod(1,16100,23300,85,95,L);
							} else if (Lm <= 100) {
								return LinFmod(1,23300,32000,95,100,L);
							} else if (Lm <= 105) {
								return LinFmod(1,32000,43000,100,105,L);
							} else if (Lm <= 115) {
								return LinFmod(1,47000,65000,106,115,L);
							} else if (Lm <= 120) {
								return LinFmod(1,75000,81000,116,120,L);
							} else if (Lm <= 130) {
								return LinFmod(1,93000,122000,121,130,L);
							} else if (Lm <= 140) {
								return LinFmod(1,140000,244000,131,140,L);
							} else {
								return LinFmod(1,281000,488000,141,150,L);
							}
						}
					} else if (SN > "BRATMITMEDIUM") {
						if (SN < "BURGLARCDHASPOWER") {
							if (SN < "BRAWLERCDARMOURTYPE") {
								if (SN == "BRATROUNDED") {
									if (Lm <= 50) {
										return CalcStat(C,L);
									} else if (Lm <= 105) {
										return RoundDbl(CalcStat(C,L),-1);
									} else if (Lm <= 115) {
										return RoundDbl(CalcStat(C,L),-2);
									} else if (Lm <= 130) {
										return RoundDbl(CalcStat(C,L),-1);
									} else {
										return RoundDbl(CalcStat(C,L),-2);
									}
								} else {
									return 0;
								}
							} else if (SN > "BRAWLERCDARMOURTYPE") {
								if (SN > "BRAWLERCDHASPOWER") {
									if (SN == "BURGLARCDARMOURTYPE") {
										return 2;
									} else {
										return 0;
									}
								} else if (SN == "BRAWLERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return 3;
							}
						} else if (SN > "BURGLARCDHASPOWER") {
							if (SN < "CAPTAINCDHASPOWER") {
								if (SN > "CAPTAINCDARMOURTYPE") {
									if (SN == "CAPTAINCDCANBLOCK") {
										if (Lm <= 14) {
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
							} else if (SN > "CAPTAINCDHASPOWER") {
								if (SN > "CHAMPIONCDARMOURTYPE") {
									if (SN == "CHAMPIONCDCANBLOCK") {
										if (Lm <= 9) {
											return 0;
										} else {
											return 1;
										}
									} else {
										return 0;
									}
								} else if (SN == "CHAMPIONCDARMOURTYPE") {
									return 3;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else {
							return 1;
						}
					} else {
						if (Lm <= 50) {
							return LinFmod(1,144,1670,1,50,L,0);
						} else if (Lm <= 60) {
							return LinFmod(1,1670,2500,50,60,L);
						} else if (Lm <= 65) {
							return LinFmod(1,2500,3300,60,65,L);
						} else if (Lm <= 75) {
							return LinFmod(1,3300,5000,65,75,L);
						} else if (Lm <= 85) {
							return LinFmod(1,5000,7500,75,85,L);
						} else if (Lm <= 95) {
							return LinFmod(1,7500,10800,85,95,L);
						} else if (Lm <= 100) {
							return LinFmod(1,10800,15100,95,100,L);
						} else if (Lm <= 105) {
							return LinFmod(1,15100,20100,100,105,L);
						} else if (Lm <= 115) {
							return LinFmod(1,22100,30000,106,115,L);
						} else if (Lm <= 120) {
							return LinFmod(1,34000,37000,116,120,L);
						} else if (Lm <= 130) {
							return LinFmod(1,43000,57000,121,130,L);
						} else if (Lm <= 140) {
							return LinFmod(1,65000,113000,131,140,L);
						} else {
							return LinFmod(1,130000,227000,141,150,L);
						}
					}
				} else {
					return 13;
				}
			} else if (SN > "CHAMPIONCDHASPOWER") {
				if (SN < "CRITMAGNPRATPA") {
					if (SN < "CRITHITPPRAT") {
						if (SN < "CRITDEFPRATPB") {
							if (SN < "CRITDEFPPRAT") {
								if (SN == "CRITDEFPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPPRAT") {
								if (SN > "CRITDEFPRATP") {
									if (SN == "CRITDEFPRATPA") {
										return 240;
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPRATP") {
									return CalcPercAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("CritDefPRatPA",L),CalcStat("CritDefPRatPB",L),CalcStat("CritDefPRatPCapR",L),N);
							}
						} else if (SN > "CRITDEFPRATPB") {
							if (SN < "CRITDEFPRATPCAP") {
								if (SN == "CRITDEFPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "CRITDEFPRATPCAP") {
								if (SN > "CRITDEFPRATPCAPR") {
									if (SN == "CRITHITPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "CRITDEFPRATPCAPR") {
									return CalcStat("CritDefPRatPB",L)*CalcStat("CritDefPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 80;
							}
						} else {
							return CalcStat("BRatRounded",L,"BRat1Tier");
						}
					} else if (SN > "CRITHITPPRAT") {
						if (SN < "CRITHITPRATPCAP") {
							if (SN < "CRITHITPRATPA") {
								if (SN == "CRITHITPRATP") {
									return CalcPercAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "CRITHITPRATPA") {
								if (SN > "CRITHITPRATPB") {
									if (SN == "CRITHITPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "CRITHITPRATPB") {
									return CalcStat("BRatRounded",L,"BRat1Tier");
								} else {
									return 0;
								}
							} else {
								return 75;
							}
						} else if (SN > "CRITHITPRATPCAP") {
							if (SN < "CRITMAGNPBONUS") {
								if (SN == "CRITHITPRATPCAPR") {
									return CalcStat("CritHitPRatPB",L)*CalcStat("CritHitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPBONUS") {
								if (SN > "CRITMAGNPPRAT") {
									if (SN == "CRITMAGNPRATP") {
										return CalcPercAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPPRAT") {
									return CalcRatAB(CalcStat("CritMagnPRatPA",L),CalcStat("CritMagnPRatPB",L),CalcStat("CritMagnPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							return 25;
						}
					} else {
						return CalcRatAB(CalcStat("CritHitPRatPA",L),CalcStat("CritHitPRatPB",L),CalcStat("CritHitPRatPCapR",L),N);
					}
				} else if (SN > "CRITMAGNPRATPA") {
					if (SN < "DEVHITPRATPC") {
						if (SN < "DEVHITPBONUS") {
							if (SN < "CRITMAGNPRATPC") {
								if (SN == "CRITMAGNPRATPB") {
									return CalcStat("BRatRounded",L,"BRat5Tier");
								} else {
									return 0;
								}
							} else if (SN > "CRITMAGNPRATPC") {
								if (SN > "CRITMAGNPRATPCAP") {
									if (SN == "CRITMAGNPRATPCAPR") {
										return CalcStat("CritMagnPRatPB",L)*CalcStat("CritMagnPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "CRITMAGNPRATPCAP") {
									return 75;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else if (SN > "DEVHITPBONUS") {
							if (SN < "DEVHITPRATP") {
								if (SN == "DEVHITPPRAT") {
									return CalcRatAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPRATP") {
								if (SN > "DEVHITPRATPA") {
									if (SN == "DEVHITPRATPB") {
										return CalcStat("BRatRounded",L,"BRat4Tier");
									} else {
										return 0;
									}
								} else if (SN == "DEVHITPRATPA") {
									return 30;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("DevHitPRatPA",L),CalcStat("DevHitPRatPB",L),CalcStat("DevHitPRatPCap",L),N);
							}
						} else {
							return 0;
						}
					} else if (SN > "DEVHITPRATPC") {
						if (SN < "EVADEPRATP") {
							if (SN < "DEVHITPRATPCAPR") {
								if (SN == "DEVHITPRATPCAP") {
									return 10;
								} else {
									return 0;
								}
							} else if (SN > "DEVHITPRATPCAPR") {
								if (SN > "EVADEPBONUS") {
									if (SN == "EVADEPPRAT") {
										return CalcStat("BPEPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPBONUS") {
									return CalcStat("BPEPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("DevHitPRatPB",L)*CalcStat("DevHitPRatPC",L);
							}
						} else if (SN > "EVADEPRATP") {
							if (SN < "EVADEPRATPC") {
								if (SN > "EVADEPRATPA") {
									if (SN == "EVADEPRATPB") {
										return CalcStat("BPEPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPA") {
									return CalcStat("BPEPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "EVADEPRATPC") {
								if (SN > "EVADEPRATPCAP") {
									if (SN == "EVADEPRATPCAPR") {
										return CalcStat("BPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "EVADEPRATPCAP") {
									return CalcStat("BPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPC",L);
							}
						} else {
							return CalcStat("BPEPRatP",L,N);
						}
					} else {
						return 0.5;
					}
				} else {
					return 225;
				}
			} else {
				return 1;
			}
		} else if (SN > "FINESSEPBONUS") {
			if (SN < "MITHEAVYPRATP") {
				if (SN < "INDMGPRATPCAPR") {
					if (SN < "GUARDIANCDHASPOWER") {
						if (SN < "FINESSEPRATPC") {
							if (SN < "FINESSEPRATP") {
								if (SN == "FINESSEPPRAT") {
									return CalcRatAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "FINESSEPRATP") {
								if (SN > "FINESSEPRATPA") {
									if (SN == "FINESSEPRATPB") {
										return CalcStat("BRatRounded",L,"BRat1Tier");
									} else {
										return 0;
									}
								} else if (SN == "FINESSEPRATPA") {
									return 150;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("FinessePRatPA",L),CalcStat("FinessePRatPB",L),CalcStat("FinessePRatPCap",L),N);
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
							return 0.5;
						}
					} else if (SN > "GUARDIANCDHASPOWER") {
						if (SN < "INDMGPRATP") {
							if (SN < "HUNTERCDHASPOWER") {
								if (SN == "HUNTERCDARMOURTYPE") {
									return 2;
								} else {
									return 0;
								}
							} else if (SN > "HUNTERCDHASPOWER") {
								if (SN > "INDMGPBONUS") {
									if (SN == "INDMGPPRAT") {
										return CalcRatAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "INDMGPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else if (SN > "INDMGPRATP") {
							if (SN < "INDMGPRATPB") {
								if (SN == "INDMGPRATPA") {
									return 1200;
								} else {
									return 0;
								}
							} else if (SN > "INDMGPRATPB") {
								if (SN > "INDMGPRATPC") {
									if (SN == "INDMGPRATPCAP") {
										return 400;
									} else {
										return 0;
									}
								} else if (SN == "INDMGPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRat1Tier");
							}
						} else {
							return CalcPercAB(CalcStat("InDmgPRatPA",L),CalcStat("InDmgPRatPB",L),CalcStat("InDmgPRatPCap",L),N);
						}
					} else {
						return 1;
					}
				} else if (SN > "INDMGPRATPCAPR") {
					if (SN < "LOREMASTERCDARMOURTYPE") {
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
										return 75;
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
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "INHEALPRATPCAP") {
								if (SN > "INHEALPRATPCAPR") {
									if (SN == "LEVELCAP") {
										return 140;
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
							return CalcStat("BRatRounded",L,"BRat1Tier");
						}
					} else if (SN > "LOREMASTERCDARMOURTYPE") {
						if (SN < "MARINERCDHASPOWER") {
							if (SN < "LVLEXPCOST") {
								if (SN == "LOREMASTERCDHASPOWER") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "LVLEXPCOST") {
								if (SN > "LVLEXPCOSTTOT") {
									if (SN == "MARINERCDARMOURTYPE") {
										return 2;
									} else {
										return 0;
									}
								} else if (SN == "LVLEXPCOSTTOT") {
									if (Lm <= 1) {
										return 0;
									} else {
										return CalcStat("LvlExpCostTot",L-1)+CalcStat("LvlExpCost",L);
									}
								} else {
									return 0;
								}
							} else {
								if (Lm <= 1) {
									return 0;
								} else if (Lm <= 5) {
									return RoundDbl(12.5*L*L+12.5666666666667*L+24.8666666666667);
								} else if (Lm <= 10) {
									return RoundDbl(33.8*L*L-179.48*L+452.6);
								} else if (Lm <= 15) {
									return RoundDbl(55.05*L*L-583.77*L+2370.5);
								} else if (Lm <= 20) {
									return RoundDbl(76.2*L*L-1196.96*L+6809);
								} else if (Lm <= 25) {
									return RoundDbl(97.4*L*L-2023*L+14849.8);
								} else if (Lm <= 30) {
									return RoundDbl(118.7*L*L-3066.02 *L+27612.8);
								} else if (Lm <= 35) {
									return RoundDbl(139.95*L*L-4319.23*L+46084.1);
								} else if (Lm <= 40) {
									return RoundDbl(161.2*L*L-5785.04*L+71356.2);
								} else if (Lm <= 45) {
									return RoundDbl(182.5*L*L-7467.38*L+104569.8);
								} else if (Lm <= 50) {
									return RoundDbl(203.8*L*L-9363.48*L+146761.8);
								} else if (Lm <= 55) {
									return RoundDbl(225.05*L*L-11467.77*L+198851.3);
								} else if (Lm <= 60) {
									return RoundDbl(246.3*L*L-13784.46*L+261988);
								} else if (Lm <= 70) {
									return RoundDbl(ExpFmod(CalcStat("LvlExpCost",60),61,5.071,L,undefined,3.485));
								} else if (Lm <= 75) {
									return RoundDbl(ExpFmod(CalcStat("LvlExpCost",70),71,5.072,L,undefined,-0.95));
								} else {
									return ExpFmod(CalcStat("LvlExpCost",75),76,5,L,0,-0.5);
								}
							}
						} else if (SN > "MARINERCDHASPOWER") {
							if (SN < "MINSTRELCDHASPOWER") {
								if (SN > "MINSTRELCDARMOURTYPE") {
									if (SN == "MINSTRELCDCANBLOCK") {
										if (Lm <= 19) {
											return 0;
										} else {
											return 1;
										}
									} else {
										return 0;
									}
								} else if (SN == "MINSTRELCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "MINSTRELCDHASPOWER") {
								if (SN > "MITHEAVYPBONUS") {
									if (SN == "MITHEAVYPPRAT") {
										return CalcRatAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCapR",L),N);
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else {
								return 1;
							}
						} else {
							return 1;
						}
					} else {
						return 1;
					}
				} else {
					return CalcStat("InDmgPRatPB",L)*CalcStat("InDmgPRatPC",L);
				}
			} else if (SN > "MITHEAVYPRATP") {
				if (SN < "MITMEDIUMPRATPCAP") {
					if (SN < "MITLIGHTPRATPB") {
						if (SN < "MITHEAVYPRATPCAPR") {
							if (SN < "MITHEAVYPRATPB") {
								if (SN == "MITHEAVYPRATPA") {
									return 180;
								} else {
									return 0;
								}
							} else if (SN > "MITHEAVYPRATPB") {
								if (SN > "MITHEAVYPRATPC") {
									if (SN == "MITHEAVYPRATPCAP") {
										return 60;
									} else {
										return 0;
									}
								} else if (SN == "MITHEAVYPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatRounded",L,"BRatMitHeavy");
							}
						} else if (SN > "MITHEAVYPRATPCAPR") {
							if (SN < "MITLIGHTPPRAT") {
								if (SN == "MITLIGHTPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPPRAT") {
								if (SN > "MITLIGHTPRATP") {
									if (SN == "MITLIGHTPRATPA") {
										return 120;
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPRATP") {
									return CalcPercAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("MitLightPRatPA",L),CalcStat("MitLightPRatPB",L),CalcStat("MitLightPRatPCapR",L),N);
							}
						} else {
							return CalcStat("MitHeavyPRatPB",L)*CalcStat("MitHeavyPRatPC",L);
						}
					} else if (SN > "MITLIGHTPRATPB") {
						if (SN < "MITMEDIUMPPRAT") {
							if (SN < "MITLIGHTPRATPCAP") {
								if (SN == "MITLIGHTPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "MITLIGHTPRATPCAP") {
								if (SN > "MITLIGHTPRATPCAPR") {
									if (SN == "MITMEDIUMPBONUS") {
										return 0;
									} else {
										return 0;
									}
								} else if (SN == "MITLIGHTPRATPCAPR") {
									return CalcStat("MitLightPRatPB",L)*CalcStat("MitLightPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 40;
							}
						} else if (SN > "MITMEDIUMPPRAT") {
							if (SN < "MITMEDIUMPRATPA") {
								if (SN == "MITMEDIUMPRATP") {
									return CalcPercAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "MITMEDIUMPRATPA") {
								if (SN > "MITMEDIUMPRATPB") {
									if (SN == "MITMEDIUMPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "MITMEDIUMPRATPB") {
									return CalcStat("BRatRounded",L,"BRatMitMedium");
								} else {
									return 0;
								}
							} else {
								return 150;
							}
						} else {
							return CalcRatAB(CalcStat("MitMediumPRatPA",L),CalcStat("MitMediumPRatPB",L),CalcStat("MitMediumPRatPCapR",L),N);
						}
					} else {
						return CalcStat("BRatRounded",L,"BRatMitLight");
					}
				} else if (SN > "MITMEDIUMPRATPCAP") {
					if (SN < "OUTHEALPBONUS") {
						if (SN < "OUTDMGPRATPA") {
							if (SN < "OUTDMGPBONUS") {
								if (SN == "MITMEDIUMPRATPCAPR") {
									return CalcStat("MitMediumPRatPB",L)*CalcStat("MitMediumPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "OUTDMGPBONUS") {
								if (SN > "OUTDMGPPRAT") {
									if (SN == "OUTDMGPRATP") {
										return CalcPercAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPPRAT") {
									return CalcRatAB(CalcStat("OutDmgPRatPA",L),CalcStat("OutDmgPRatPB",L),CalcStat("OutDmgPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else if (SN > "OUTDMGPRATPA") {
							if (SN < "OUTDMGPRATPC") {
								if (SN == "OUTDMGPRATPB") {
									return CalcStat("BRatRounded",L,"BRat2Tier");
								} else {
									return 0;
								}
							} else if (SN > "OUTDMGPRATPC") {
								if (SN > "OUTDMGPRATPCAP") {
									if (SN == "OUTDMGPRATPCAPR") {
										return CalcStat("OutDmgPRatPB",L)*CalcStat("OutDmgPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "OUTDMGPRATPCAP") {
									return 200;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else {
							return 600;
						}
					} else if (SN > "OUTHEALPBONUS") {
						if (SN < "OUTHEALPRATPC") {
							if (SN < "OUTHEALPRATP") {
								if (SN == "OUTHEALPPRAT") {
									return CalcRatAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else if (SN > "OUTHEALPRATP") {
								if (SN > "OUTHEALPRATPA") {
									if (SN == "OUTHEALPRATPB") {
										return CalcStat("BRatRounded",L,"BRat4Tier");
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATPA") {
									return 210;
								} else {
									return 0;
								}
							} else {
								return CalcPercAB(CalcStat("OutHealPRatPA",L),CalcStat("OutHealPRatPB",L),CalcStat("OutHealPRatPCap",L),N);
							}
						} else if (SN > "OUTHEALPRATPC") {
							if (SN < "PARRYPBONUS") {
								if (SN > "OUTHEALPRATPCAP") {
									if (SN == "OUTHEALPRATPCAPR") {
										return CalcStat("OutHealPRatPB",L)*CalcStat("OutHealPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "OUTHEALPRATPCAP") {
									return 70;
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
							return 0.5;
						}
					} else {
						return 0;
					}
				} else {
					return 50;
				}
			} else {
				return CalcPercAB(CalcStat("MitHeavyPRatPA",L),CalcStat("MitHeavyPRatPB",L),CalcStat("MitHeavyPRatPCap",L),N);
			}
		} else {
			return 0;
		}
	} else if (SN > "PARRYPRATPA") {
		if (SN < "PHYMITHPRATPC") {
			if (SN < "PARTEVADEPRATPB") {
				if (SN < "PARTBLOCKPRATPCAPR") {
					if (SN < "PARTBLOCKMITPRATPC") {
						if (SN < "PARTBLOCKMITPBONUS") {
							if (SN < "PARRYPRATPC") {
								if (SN == "PARRYPRATPB") {
									return CalcStat("BPEPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARRYPRATPC") {
								if (SN > "PARRYPRATPCAP") {
									if (SN == "PARRYPRATPCAPR") {
										return CalcStat("BPEPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARRYPRATPCAP") {
									return CalcStat("BPEPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BPEPRatPC",L);
							}
						} else if (SN > "PARTBLOCKMITPBONUS") {
							if (SN < "PARTBLOCKMITPRATP") {
								if (SN == "PARTBLOCKMITPPRAT") {
									return CalcStat("PartMitPPRat",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPRATP") {
								if (SN > "PARTBLOCKMITPRATPA") {
									if (SN == "PARTBLOCKMITPRATPB") {
										return CalcStat("PartMitPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKMITPRATPA") {
									return CalcStat("PartMitPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatP",L,N);
							}
						} else {
							return CalcStat("PartMitPBonus",L);
						}
					} else if (SN > "PARTBLOCKMITPRATPC") {
						if (SN < "PARTBLOCKPRATP") {
							if (SN < "PARTBLOCKMITPRATPCAPR") {
								if (SN == "PARTBLOCKMITPRATPCAP") {
									return CalcStat("PartMitPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKMITPRATPCAPR") {
								if (SN > "PARTBLOCKPBONUS") {
									if (SN == "PARTBLOCKPPRAT") {
										return CalcStat("PartBPEPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPBONUS") {
									return CalcStat("PartBPEPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPCapR",L);
							}
						} else if (SN > "PARTBLOCKPRATP") {
							if (SN < "PARTBLOCKPRATPB") {
								if (SN == "PARTBLOCKPRATPA") {
									return CalcStat("PartBPEPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTBLOCKPRATPB") {
								if (SN > "PARTBLOCKPRATPC") {
									if (SN == "PARTBLOCKPRATPCAP") {
										return CalcStat("PartBPEPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBLOCKPRATPC") {
									return CalcStat("PartBPEPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPB",L);
							}
						} else {
							return CalcStat("PartBPEPRatP",L,N);
						}
					} else {
						return CalcStat("PartMitPRatPC",L);
					}
				} else if (SN > "PARTBLOCKPRATPCAPR") {
					if (SN < "PARTEVADEMITPPRAT") {
						if (SN < "PARTBPEPRATPB") {
							if (SN < "PARTBPEPPRAT") {
								if (SN == "PARTBPEPBONUS") {
									return 0;
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPPRAT") {
								if (SN > "PARTBPEPRATP") {
									if (SN == "PARTBPEPRATPA") {
										return 75;
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATP") {
									return CalcPercAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCap",L),N);
								} else {
									return 0;
								}
							} else {
								return CalcRatAB(CalcStat("PartBPEPRatPA",L),CalcStat("PartBPEPRatPB",L),CalcStat("PartBPEPRatPCapR",L),N);
							}
						} else if (SN > "PARTBPEPRATPB") {
							if (SN < "PARTBPEPRATPCAP") {
								if (SN == "PARTBPEPRATPC") {
									return 0.5;
								} else {
									return 0;
								}
							} else if (SN > "PARTBPEPRATPCAP") {
								if (SN > "PARTBPEPRATPCAPR") {
									if (SN == "PARTEVADEMITPBONUS") {
										return CalcStat("PartMitPBonus",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTBPEPRATPCAPR") {
									return CalcStat("PartBPEPRatPB",L)*CalcStat("PartBPEPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return 25;
							}
						} else {
							return CalcStat("BRatRounded",L,"BRat3Tier");
						}
					} else if (SN > "PARTEVADEMITPPRAT") {
						if (SN < "PARTEVADEMITPRATPCAP") {
							if (SN < "PARTEVADEMITPRATPA") {
								if (SN == "PARTEVADEMITPRATP") {
									return CalcStat("PartMitPRatP",L,N);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEMITPRATPA") {
								if (SN > "PARTEVADEMITPRATPB") {
									if (SN == "PARTEVADEMITPRATPC") {
										return CalcStat("PartMitPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEMITPRATPB") {
									return CalcStat("PartMitPRatPB",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPA",L);
							}
						} else if (SN > "PARTEVADEMITPRATPCAP") {
							if (SN < "PARTEVADEPPRAT") {
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
							} else if (SN > "PARTEVADEPPRAT") {
								if (SN > "PARTEVADEPRATP") {
									if (SN == "PARTEVADEPRATPA") {
										return CalcStat("PartBPEPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPRATP") {
									return CalcStat("PartBPEPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPPRat",L,N);
							}
						} else {
							return CalcStat("PartMitPRatPCap",L);
						}
					} else {
						return CalcStat("PartMitPPRat",L,N);
					}
				} else {
					return CalcStat("PartBPEPRatPCapR",L);
				}
			} else if (SN > "PARTEVADEPRATPB") {
				if (SN < "PARTPARRYPBONUS") {
					if (SN < "PARTMITPRATPCAP") {
						if (SN < "PARTMITPPRAT") {
							if (SN < "PARTEVADEPRATPCAP") {
								if (SN == "PARTEVADEPRATPC") {
									return CalcStat("PartBPEPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTEVADEPRATPCAP") {
								if (SN > "PARTEVADEPRATPCAPR") {
									if (SN == "PARTMITPBONUS") {
										return 0.1;
									} else {
										return 0;
									}
								} else if (SN == "PARTEVADEPRATPCAPR") {
									return CalcStat("PartBPEPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCap",L);
							}
						} else if (SN > "PARTMITPPRAT") {
							if (SN < "PARTMITPRATPA") {
								if (SN == "PARTMITPRATP") {
									return CalcPercAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCap",L),N);
								} else {
									return 0;
								}
							} else if (SN > "PARTMITPRATPA") {
								if (SN > "PARTMITPRATPB") {
									if (SN == "PARTMITPRATPC") {
										return 0.5;
									} else {
										return 0;
									}
								} else if (SN == "PARTMITPRATPB") {
									return CalcStat("BRatRounded",L,"BRat3Tier");
								} else {
									return 0;
								}
							} else {
								return 105;
							}
						} else {
							return CalcRatAB(CalcStat("PartMitPRatPA",L),CalcStat("PartMitPRatPB",L),CalcStat("PartMitPRatPCapR",L),N);
						}
					} else if (SN > "PARTMITPRATPCAP") {
						if (SN < "PARTPARRYMITPRATPA") {
							if (SN < "PARTPARRYMITPBONUS") {
								if (SN == "PARTMITPRATPCAPR") {
									return CalcStat("PartMitPRatPB",L)*CalcStat("PartMitPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPBONUS") {
								if (SN > "PARTPARRYMITPPRAT") {
									if (SN == "PARTPARRYMITPRATP") {
										return CalcStat("PartMitPRatP",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPPRAT") {
									return CalcStat("PartMitPPRat",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPBonus",L);
							}
						} else if (SN > "PARTPARRYMITPRATPA") {
							if (SN < "PARTPARRYMITPRATPC") {
								if (SN == "PARTPARRYMITPRATPB") {
									return CalcStat("PartMitPRatPB",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYMITPRATPC") {
								if (SN > "PARTPARRYMITPRATPCAP") {
									if (SN == "PARTPARRYMITPRATPCAPR") {
										return CalcStat("PartMitPRatPCapR",L);
									} else {
										return 0;
									}
								} else if (SN == "PARTPARRYMITPRATPCAP") {
									return CalcStat("PartMitPRatPCap",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartMitPRatPC",L);
							}
						} else {
							return CalcStat("PartMitPRatPA",L);
						}
					} else {
						return 35;
					}
				} else if (SN > "PARTPARRYPBONUS") {
					if (SN < "PHYDMGPRATP") {
						if (SN < "PARTPARRYPRATPC") {
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
						} else if (SN > "PARTPARRYPRATPC") {
							if (SN < "PARTPARRYPRATPCAPR") {
								if (SN == "PARTPARRYPRATPCAP") {
									return CalcStat("PartBPEPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PARTPARRYPRATPCAPR") {
								if (SN > "PHYDMGPBONUS") {
									if (SN == "PHYDMGPPRAT") {
										return CalcStat("OutDmgPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPBONUS") {
									return CalcStat("OutDmgPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("PartBPEPRatPCapR",L);
							}
						} else {
							return CalcStat("PartBPEPRatPC",L);
						}
					} else if (SN > "PHYDMGPRATP") {
						if (SN < "PHYDMGPRATPCAPR") {
							if (SN < "PHYDMGPRATPB") {
								if (SN == "PHYDMGPRATPA") {
									return CalcStat("OutDmgPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYDMGPRATPB") {
								if (SN > "PHYDMGPRATPC") {
									if (SN == "PHYDMGPRATPCAP") {
										return CalcStat("OutDmgPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYDMGPRATPC") {
									return CalcStat("OutDmgPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPRatPB",L);
							}
						} else if (SN > "PHYDMGPRATPCAPR") {
							if (SN < "PHYMITHPRATP") {
								if (SN > "PHYMITHPBONUS") {
									if (SN == "PHYMITHPPRAT") {
										return CalcStat("MitHeavyPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPBONUS") {
									return CalcStat("MitHeavyPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPRATP") {
								if (SN > "PHYMITHPRATPA") {
									if (SN == "PHYMITHPRATPB") {
										return CalcStat("MitHeavyPRatPB",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITHPRATPA") {
									return CalcStat("MitHeavyPRatPA",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatP",L,N);
							}
						} else {
							return CalcStat("OutDmgPRatPCapR",L);
						}
					} else {
						return CalcStat("OutDmgPRatP",L,N);
					}
				} else {
					return CalcStat("PartBPEPBonus",L);
				}
			} else {
				return CalcStat("PartBPEPRatPB",L);
			}
		} else if (SN > "PHYMITHPRATPC") {
			if (SN < "T2PENRESIST") {
				if (SN < "PNTMPBPE") {
					if (SN < "PHYMITLPRATPCAPR") {
						if (SN < "PHYMITLPRATP") {
							if (SN < "PHYMITHPRATPCAPR") {
								if (SN == "PHYMITHPRATPCAP") {
									return CalcStat("MitHeavyPRatPCap",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITHPRATPCAPR") {
								if (SN > "PHYMITLPBONUS") {
									if (SN == "PHYMITLPPRAT") {
										return CalcStat("MitLightPPRat",L,N);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPBONUS") {
									return CalcStat("MitLightPBonus",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitHeavyPRatPCapR",L);
							}
						} else if (SN > "PHYMITLPRATP") {
							if (SN < "PHYMITLPRATPB") {
								if (SN == "PHYMITLPRATPA") {
									return CalcStat("MitLightPRatPA",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITLPRATPB") {
								if (SN > "PHYMITLPRATPC") {
									if (SN == "PHYMITLPRATPCAP") {
										return CalcStat("MitLightPRatPCap",L);
									} else {
										return 0;
									}
								} else if (SN == "PHYMITLPRATPC") {
									return CalcStat("MitLightPRatPC",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitLightPRatPB",L);
							}
						} else {
							return CalcStat("MitLightPRatP",L,N);
						}
					} else if (SN > "PHYMITLPRATPCAPR") {
						if (SN < "PHYMITMPRATPB") {
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
						} else if (SN > "PHYMITMPRATPB") {
							if (SN < "PHYMITMPRATPCAP") {
								if (SN == "PHYMITMPRATPC") {
									return CalcStat("MitMediumPRatPC",L);
								} else {
									return 0;
								}
							} else if (SN > "PHYMITMPRATPCAP") {
								if (SN > "PHYMITMPRATPCAPR") {
									if (SN == "PNTMPARMOURPENT") {
										return 72/1200;
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
						} else {
							return CalcStat("MitMediumPRatPB",L);
						}
					} else {
						return CalcStat("MitLightPRatPCapR",L);
					}
				} else if (SN > "PNTMPBPE") {
					if (SN < "RESISTPRATPA") {
						if (SN < "PROGEXTCOMHIGHRAW") {
							if (SN < "PROGBARMOUR") {
								if (SN == "PNTMPRESIST") {
									return 36/1200;
								} else {
									return 0;
								}
							} else if (SN > "PROGBARMOUR") {
								if (SN > "PROGBBPE") {
									if (SN == "PROGBRESIST") {
										return CalcStat("BRat2Tier",L);
									} else {
										return 0;
									}
								} else if (SN == "PROGBBPE") {
									return CalcStat("BRat1Tier",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("BRatMitMedium",L);
							}
						} else if (SN > "PROGEXTCOMHIGHRAW") {
							if (SN < "RESISTPBONUS") {
								if (SN == "PROGEXTCOMLOWRAW") {
									if (Lm <= 116) {
										return ExpFmod(N,116,20,L);
									} else if (Lm <= 120) {
										return ExpFmod(CalcStat("ProgExtComLowRaw",116,N),117,5.5,L);
									} else {
										return CalcStat("ProgExtComHighRaw",L,CalcStat("ProgExtComLowRaw",120,N));
									}
								} else {
									return 0;
								}
							} else if (SN > "RESISTPBONUS") {
								if (SN > "RESISTPPRAT") {
									if (SN == "RESISTPRATP") {
										return CalcPercAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCap",L),N);
									} else {
										return 0;
									}
								} else if (SN == "RESISTPPRAT") {
									return CalcRatAB(CalcStat("ResistPRatPA",L),CalcStat("ResistPRatPB",L),CalcStat("ResistPRatPCapR",L),N);
								} else {
									return 0;
								}
							} else {
								return 0;
							}
						} else {
							if (Lm <= 121) {
								return ExpFmod(N,121,20,L);
							} else if (Lm <= 125) {
								return ExpFmod(CalcStat("ProgExtComHighRaw",121,N),122,5.5,L);
							} else if (Lm <= 126) {
								return ExpFmod(CalcStat("ProgExtComHighRaw",125,N),126,20,L);
							} else if (Lm <= 130) {
								return ExpFmod(CalcStat("ProgExtComHighRaw",126,N),127,5.5,L);
							} else if (Lm <= 131) {
								return ExpFmod(CalcStat("ProgExtComHighRaw",130,N),131,20,L);
							} else if (Lm <= 140) {
								return ExpFmod(CalcStat("ProgExtComHighRaw",131,N),132,5.5,L);
							} else {
								return CalcStat("ProgExtComHighRaw",140,N);
							}
						}
					} else if (SN > "RESISTPRATPA") {
						if (SN < "RESISTT") {
							if (SN < "RESISTPRATPC") {
								if (SN == "RESISTPRATPB") {
									return CalcStat("BRatRounded",L,"BRat2Tier");
								} else {
									return 0;
								}
							} else if (SN > "RESISTPRATPC") {
								if (SN > "RESISTPRATPCAP") {
									if (SN == "RESISTPRATPCAPR") {
										return CalcStat("ResistPRatPB",L)*CalcStat("ResistPRatPC",L);
									} else {
										return 0;
									}
								} else if (SN == "RESISTPRATPCAP") {
									return 50;
								} else {
									return 0;
								}
							} else {
								return 0.5;
							}
						} else if (SN > "RESISTT") {
							if (SN < "T2PENARMOUR") {
								if (SN > "RUNEKEEPERCDARMOURTYPE") {
									if (SN == "RUNEKEEPERCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "RUNEKEEPERCDARMOURTYPE") {
									return 1;
								} else {
									return 0;
								}
							} else if (SN > "T2PENARMOUR") {
								if (SN > "T2PENBPE") {
									if (SN == "T2PENMIT") {
										if (Lm <= 115) {
											return FloorDbl(L*13.5)*-5;
										} else {
											return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenMit",115));
										}
									} else {
										return 0;
									}
								} else if (SN == "T2PENBPE") {
									if (Lm <= 115) {
										return (-40)*L;
									} else {
										return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenBPE",115));
									}
								} else {
									return 0;
								}
							} else {
								return CalcStat("T2penMit",L);
							}
						} else {
							return StatLinInter("PntMPResist","TraitProg","ProgBResist","",L,N,0);
						}
					} else {
						return 150;
					}
				} else {
					return 42/1200;
				}
			} else if (SN > "T2PENRESIST") {
				if (SN < "TACMITLPRATPA") {
					if (SN < "TACMITHPPRAT") {
						if (SN < "TACDMGPRATPB") {
							if (SN < "TACDMGPPRAT") {
								if (SN == "TACDMGPBONUS") {
									return CalcStat("OutDmgPBonus",L);
								} else {
									return 0;
								}
							} else if (SN > "TACDMGPPRAT") {
								if (SN > "TACDMGPRATP") {
									if (SN == "TACDMGPRATPA") {
										return CalcStat("OutDmgPRatPA",L);
									} else {
										return 0;
									}
								} else if (SN == "TACDMGPRATP") {
									return CalcStat("OutDmgPRatP",L,N);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPPRat",L,N);
							}
						} else if (SN > "TACDMGPRATPB") {
							if (SN < "TACDMGPRATPCAP") {
								if (SN == "TACDMGPRATPC") {
									return CalcStat("OutDmgPRatPC",L);
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
									return CalcStat("OutDmgPRatPCapR",L);
								} else {
									return 0;
								}
							} else {
								return CalcStat("OutDmgPRatPCap",L);
							}
						} else {
							return CalcStat("OutDmgPRatPB",L);
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
										return -CalcStat("BPET",L,CalcStat("TpenChoice",N));
									} else {
										return 0;
									}
								} else if (SN == "TPENARMOUR") {
									return -CalcStat("ArmourPenT",L,CalcStat("TpenChoice",N));
								} else {
									return 0;
								}
							} else {
								return CalcStat("MitMediumPRatPCapR",L);
							}
						} else if (SN > "TPENCHOICE") {
							if (SN < "WARDENCDARMOURTYPE") {
								if (SN > "TPENRESIST") {
									if (SN == "TRAITPROG") {
										return [[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141],[1,25,50,60,65,75,85,95,100,105,115,120,130,131,140,141]];
									} else {
										return 0;
									}
								} else if (SN == "TPENRESIST") {
									return -CalcStat("ResistT",L,CalcStat("TpenChoice",N)*2);
								} else {
									return 0;
								}
							} else if (SN > "WARDENCDARMOURTYPE") {
								if (SN > "WARDENCDCANBLOCK") {
									if (SN == "WARDENCDHASPOWER") {
										return 1;
									} else {
										return 0;
									}
								} else if (SN == "WARDENCDCANBLOCK") {
									return 1;
								} else {
									return 0;
								}
							} else {
								return 2;
							}
						} else {
							return DataTableValue([0,1,2],L);
						}
					} else {
						return CalcStat("MitMediumPRatPC",L);
					}
				} else {
					return CalcStat("MitLightPRatPA",L);
				}
			} else {
				if (Lm <= 115) {
					return (-90)*L;
				} else {
					return CalcStat("ProgExtComLowRaw",L,CalcStat("T2PenResist",115));
				}
			}
		} else {
			return CalcStat("MitHeavyPRatPC",L);
		}
	} else {
		return CalcStat("BPEPRatPA",L);
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

function ExpFmod(dVal, dLstart, dPlvl, dLvl, vDec, vAdd)
{
	var dRng = dLvl-dLstart+1;
	if (dRng <= DblCalcDev)
		return dVal;
	else {
		var dFac = 1+dPlvl/100;
		var dAdd = ((typeof vAdd === "undefined") ? 0 : vAdd);
		if (typeof vDec === "undefined") {
			var dFacExp = Math.pow(dFac,dRng);
			return dVal*dFacExp+dAdd*((dFacExp-1)/(dFac-1));
		}
		else {
			var dResult = dVal;
			var dDec = ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? 1 : Math.pow(10,vDec));
			dFac = dFac*dDec;
			dAdd = dAdd*dDec+0.5+DblCalcDev;
			var dL = dLstart-DblCalcDev;
			while (dL++ <= dLvl)
				dResult = Math.floor(dResult*dFac+dAdd)/dDec;
			return dResult;
		}
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

// SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
// StatLinInter: (Normalized) Stat Linear Interpolating

function StatLinInter(sPntMP, sProgScheme, sProgBase, sAdj, dLvl, vNorC, vRoundType)
{
	var dN = 1;
	var sC = "";
	if (typeof vNorC !== "undefined") {
		if (typeof vNorC === "number")
			dN = vNorC;
		else if (typeof vNorC === "string")
			sC = vNorC;
	}

	// parameter processing
	var dRoundType = 0;
	if (typeof vRoundType === "number")
		dRoundType = vRoundType;
	
	var dProgScheme = CalcStat(sProgScheme,dLvl);
	if (typeof dProgScheme === "undefined") return 0.0;

	// find level interval
	var dLvlMinus = dLvl-DblCalcDev;
	var iPointIndexHigh = 1;
	var iPointIndexMax = dProgScheme[0].length-1;
	while (iPointIndexHigh < iPointIndexMax) {
		if (dLvlMinus <= dProgScheme[0][iPointIndexHigh])
			break;
		iPointIndexHigh++;
	}
	var iPointIndexLow = iPointIndexHigh-1;
		
	var dAccessLvlLow = dProgScheme[0][iPointIndexLow];
	var dAccessLvlHigh = dProgScheme[0][iPointIndexHigh];
	var dBaseLvlLow = dProgScheme[1][iPointIndexLow];
	var dBaseLvlHigh = dProgScheme[1][iPointIndexHigh];
	
	// get values from base progression
	var dValLow = CalcStat(sProgBase,dBaseLvlLow,sC);
	var dValHigh = CalcStat(sProgBase,dBaseLvlHigh,sC);

	// graph point multiplications
	if (typeof sPntMP === "string" && sPntMP.trim() != "") {
		dValLow *= CalcStat(sPntMP,dAccessLvlLow,sC);
		dValHigh *= CalcStat(sPntMP,dAccessLvlHigh,sC);
	}
	if (typeof sAdj === "string" && sAdj.trim() != "") {
		dValLow *= CalcStat(sAdj,dAccessLvlLow,sC);
		dValHigh *= CalcStat(sAdj,dAccessLvlHigh,sC);
	}
	dValLow *= dN;
	dValHigh *= dN;

	// graph point roundings
	if (dRoundType == 0) {
		dValLow = LotroDbl(dValLow);
		dValHigh = LotroDbl(dValHigh);
	}
	else if (dRoundType == 1) {
		if (-1000.0 <= dValLow && dValLow <= 1000.0)
			dValLow = CeilDbl(dValLow,2);
		else
			dValLow = LotroDbl(dValLow);
		if (-1000.0 <= dValHigh && dValHigh <= 1000.0)
			dValHigh = CeilDbl(dValHigh,2);
		else
			dValHigh = LotroDbl(dValHigh);
	}

	// return interpolated value from the calculated graph points
	return LinFmod(1,dValLow,dValHigh,dAccessLvlLow,dAccessLvlHigh,dLvl);
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
	else if (dLstart == dLend)
		return 0;
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
	var sArmCat = armourcode.substr(0,1);
	var sArmType = armourcode.substr(1,1);
	var sArmCol = armourcode.substr(2,1);
	if (sArmType == "S" && sArmCol == "H") {
		sArmType = "SH";
		sArmCol = armourcode.substr(3,1);
	} else if (sArmCat == "C" && sArmType == "L") {
		sArmCat = "M";
		sArmType = "CL";
	} else
		sArmType = " "+sArmType;
	
	switch (iI) {
		case 1:
			var ind = "HML".indexOf(sArmCat);
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

// QualityCodeIndex: returns a quality index from a Quality Code.
// sQCode string: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function QualityCodeIndex(sQCode)
{
	var ind = "WYPTG".indexOf(sQCode.trim().substr(0,1).toUpperCase());
	return ((ind == -1) ? 0 : ind+1);
}

// WpnCodeIndex: returns a specified index from a Weapon Code.
// sWCode string:
// 1st position: H=heavy, L=light
// 2nd position: O=one-handed, T=two-handed, B=bow
// 3rd position: W=white/common, Y=yellow/uncommon, P=purple/rare, T=teal/blue/incomparable, G=gold/legendary/epic

function WpnCodeIndex(sWCode, iI)
{
	var weaponcode = sWCode.trim().toUpperCase();
	var sWpnCat = weaponcode.substr(0,1);
	var sWpnType = weaponcode.substr(1,1);
	var sWpnCol = weaponcode.substr(2,1);
	
	switch (iI) {
		case 1:
			var ind = "HL".indexOf(sWpnCat);
			return ((ind == -1) ? 0 : ind+1);
		case 2:
			var ind = "OTB".indexOf(sWpnType);
			return ((ind == -1) ? 0 : ind+1);
		case 3:
			var ind = "WYPTG".indexOf(sWpnCol);
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
			for (var ind = 0, len = RomanRankChars.length; ind < len; ind++)
				if (sn.indexOf(RomanRankChars[ind]) == 0)
					return RomanRankValues[ind]+RomanRankDecode(sn.slice(RomanRankChars[ind].length));
	}
	return 0;
}

// ReverseCalc: tries to calculate back a calculation result to the original (integer) level.
// Does not support N.

function ReverseCalc(sStat, dNum)
{
	if (sStat.trim().length > 0) {
		var minlvl = 1;
		var maxlvl = 500;
		var devlvl = 3;
	
		var left = minlvl-1;
		var right = maxlvl;
		var middle = 0;
		
		var count = minlvl;

		while (right > left+1 && count++ <= maxlvl) {
			middle = Math.floor((left+right)/2+DblCalcDev);
			if (CalcStat(sStat,middle)+DblCalcDev >= dNum)
				right = middle;
			else
				left = middle;
		}

		var mintest = Math.max(right-devlvl,minlvl);
		var maxtest = Math.min(right+devlvl,maxlvl);

		var dFound = 0;
	
		// we check nearby in case the progression is not completely ascending/sorted.
		for (var test = mintest; test <= maxtest; test++) {
			dFound = CalcStat(sStat,test);
			if  (dNum-DblCalcDev <= dFound && dFound <= dNum+DblCalcDev)
				return test;
		}
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

function CeilDbl(dNum, vDec)
{
	if (typeof vDec === "undefined")
		return Math.ceil(dNum-DblCalcDev);
	else
		return ((-DblCalcDev <= vDec && vDec <= DblCalcDev) ? Math.ceil(dNum-DblCalcDev) : Math.ceil(dNum*Math.pow(10,vDec)-DblCalcDev)/Math.pow(10,vDec));
}

function LotroDbl(dNum)
{
	var dNumCeiled = CeilDbl(dNum,0);

	if (-DblCalcDev <= dNumCeiled && dNumCeiled <= DblCalcDev)
		return 0;
	else {
		var dLen;
		if (dNumCeiled > DblCalcDev)
			dLen = Math.floor(Math.log10(dNumCeiled)+DblCalcDev)+1;
		else
			dLen = Math.floor(Math.log10(-dNumCeiled)+DblCalcDev)+1;
		var dDec = 3-dLen;
		if (dDec < -DblCalcDev)
			return CeilDbl(dNum,dDec);
		else
			return dNumCeiled;
	}
}
