/**
 * Makes a plot of the loss over iterations from the given training algorithm
 * 
 * @param model object
 * 
 * @returns void
 */
function PlotGraph() {
    let canvas = document.getElementById("LossChart")
    let ctx  = canvas.getContext("2d")

    let model = {"stats": [
        [
            {
                "fwd_time": 5,
                "bwd_time": 9,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.4102664046530933,
                "softmax_loss": 2.4102664046530933,
                "loss": 2.4102664046530933
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 3.296774760505138,
                "softmax_loss": 3.296774760505138,
                "loss": 3.296774760505138
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.3146594529395195,
                "softmax_loss": 2.3146594529395195,
                "loss": 2.3146594529395195
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.143056279787216,
                "softmax_loss": 2.143056279787216,
                "loss": 2.143056279787216
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.036381240307921,
                "softmax_loss": 2.036381240307921,
                "loss": 2.036381240307921
            }
        ],
        [
            {
                "fwd_time": 6,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.039118543329765,
                "softmax_loss": 2.039118543329765,
                "loss": 2.039118543329765
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.386042490527864,
                "softmax_loss": 2.386042490527864,
                "loss": 2.386042490527864
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.566627950756409,
                "softmax_loss": 2.566627950756409,
                "loss": 2.566627950756409
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.0155582641692296,
                "softmax_loss": 2.0155582641692296,
                "loss": 2.0155582641692296
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 3.235973855423697,
                "softmax_loss": 3.235973855423697,
                "loss": 3.235973855423697
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.737587605333621,
                "softmax_loss": 2.737587605333621,
                "loss": 2.737587605333621
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.2909255441298932,
                "softmax_loss": 2.2909255441298932,
                "loss": 2.2909255441298932
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.33851556405177,
                "softmax_loss": 2.33851556405177,
                "loss": 2.33851556405177
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.735438717935061,
                "softmax_loss": 2.735438717935061,
                "loss": 2.735438717935061
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.555953210541869,
                "softmax_loss": 1.555953210541869,
                "loss": 1.555953210541869
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.700461174517899,
                "softmax_loss": 2.700461174517899,
                "loss": 2.700461174517899
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.262462779001673,
                "softmax_loss": 1.262462779001673,
                "loss": 1.262462779001673
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.109010222722534,
                "softmax_loss": 2.109010222722534,
                "loss": 2.109010222722534
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7133423983153184,
                "softmax_loss": 0.7133423983153184,
                "loss": 0.7133423983153184
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.7427536136486337,
                "softmax_loss": 1.7427536136486337,
                "loss": 1.7427536136486337
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.9771295908275293,
                "softmax_loss": 0.9771295908275293,
                "loss": 0.9771295908275293
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.9799347379639322,
                "softmax_loss": 0.9799347379639322,
                "loss": 0.9799347379639322
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.8878635430312694,
                "softmax_loss": 0.8878635430312694,
                "loss": 0.8878635430312694
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.661178298196431,
                "softmax_loss": 2.661178298196431,
                "loss": 2.661178298196431
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.8112748984875582,
                "softmax_loss": 1.8112748984875582,
                "loss": 1.8112748984875582
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.595139986724532,
                "softmax_loss": 2.595139986724532,
                "loss": 2.595139986724532
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7578013132320116,
                "softmax_loss": 0.7578013132320116,
                "loss": 0.7578013132320116
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.9987077487159888,
                "softmax_loss": 1.9987077487159888,
                "loss": 1.9987077487159888
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7422416154931024,
                "softmax_loss": 0.7422416154931024,
                "loss": 0.7422416154931024
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.179128942652879,
                "softmax_loss": 2.179128942652879,
                "loss": 2.179128942652879
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7741664945831799,
                "softmax_loss": 0.7741664945831799,
                "loss": 0.7741664945831799
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.4736632209995222,
                "softmax_loss": 1.4736632209995222,
                "loss": 1.4736632209995222
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.61027643281197,
                "softmax_loss": 0.61027643281197,
                "loss": 0.61027643281197
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.9349365916457604,
                "softmax_loss": 2.9349365916457604,
                "loss": 2.9349365916457604
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.16209378059958074,
                "softmax_loss": 0.16209378059958074,
                "loss": 0.16209378059958074
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.248158147165614,
                "softmax_loss": 2.248158147165614,
                "loss": 2.248158147165614
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.6601334381172095,
                "softmax_loss": 1.6601334381172095,
                "loss": 1.6601334381172095
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.023148300297015954,
                "softmax_loss": 0.023148300297015954,
                "loss": 0.023148300297015954
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.548686649822546,
                "softmax_loss": 1.548686649822546,
                "loss": 1.548686649822546
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.34565589553593973,
                "softmax_loss": 0.34565589553593973,
                "loss": 0.34565589553593973
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.021016849915546986,
                "softmax_loss": 0.021016849915546986,
                "loss": 0.021016849915546986
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.7490822421353,
                "softmax_loss": 2.7490822421353,
                "loss": 2.7490822421353
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.20798922157903446,
                "softmax_loss": 0.20798922157903446,
                "loss": 0.20798922157903446
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.020005685467016525,
                "softmax_loss": 0.020005685467016525,
                "loss": 0.020005685467016525
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.04565946989784868,
                "softmax_loss": 0.04565946989784868,
                "loss": 0.04565946989784868
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7145851222893295,
                "softmax_loss": 0.7145851222893295,
                "loss": 0.7145851222893295
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.8804139859078517,
                "softmax_loss": 0.8804139859078517,
                "loss": 0.8804139859078517
            }
        ],
        [
            {
                "fwd_time": 6,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.87236262747873,
                "softmax_loss": 0.87236262747873,
                "loss": 0.87236262747873
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.025114323815692063,
                "softmax_loss": 0.025114323815692063,
                "loss": 0.025114323815692063
            }
        ],
        [
            {
                "fwd_time": 6,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 3.035236155502927,
                "softmax_loss": 3.035236155502927,
                "loss": 3.035236155502927
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.16500437217361025,
                "softmax_loss": 0.16500437217361025,
                "loss": 0.16500437217361025
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.19012539250230995,
                "softmax_loss": 0.19012539250230995,
                "loss": 0.19012539250230995
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.684779731387241,
                "softmax_loss": 0.684779731387241,
                "loss": 0.684779731387241
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.222650801627919,
                "softmax_loss": 2.222650801627919,
                "loss": 2.222650801627919
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.9122843721898856,
                "softmax_loss": 0.9122843721898856,
                "loss": 0.9122843721898856
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 3.9524594412988248,
                "softmax_loss": 3.9524594412988248,
                "loss": 3.9524594412988248
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.47060131293864216,
                "softmax_loss": 0.47060131293864216,
                "loss": 0.47060131293864216
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.880566230006846,
                "softmax_loss": 0.880566230006846,
                "loss": 0.880566230006846
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.8594494514908859,
                "softmax_loss": 0.8594494514908859,
                "loss": 0.8594494514908859
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.16462595619817036,
                "softmax_loss": 0.16462595619817036,
                "loss": 0.16462595619817036
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.423173848845005,
                "softmax_loss": 2.423173848845005,
                "loss": 2.423173848845005
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.04336486235136254,
                "softmax_loss": 0.04336486235136254,
                "loss": 0.04336486235136254
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7611856071556382,
                "softmax_loss": 0.7611856071556382,
                "loss": 0.7611856071556382
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.01691453692599095,
                "softmax_loss": 0.01691453692599095,
                "loss": 0.01691453692599095
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.8067744065174318,
                "softmax_loss": 0.8067744065174318,
                "loss": 0.8067744065174318
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.13249302584992756,
                "softmax_loss": 0.13249302584992756,
                "loss": 0.13249302584992756
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 5.560977443194072,
                "softmax_loss": 5.560977443194072,
                "loss": 5.560977443194072
            }
        ],
        [
            {
                "fwd_time": 6,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.042184094392478146,
                "softmax_loss": 0.042184094392478146,
                "loss": 0.042184094392478146
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.9042183069908398,
                "softmax_loss": 0.9042183069908398,
                "loss": 0.9042183069908398
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.05445985673386203,
                "softmax_loss": 0.05445985673386203,
                "loss": 0.05445985673386203
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.3935882097002009,
                "softmax_loss": 0.3935882097002009,
                "loss": 0.3935882097002009
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 1.7308121982527165,
                "softmax_loss": 1.7308121982527165,
                "loss": 1.7308121982527165
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.8381494417026847,
                "softmax_loss": 2.8381494417026847,
                "loss": 2.8381494417026847
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.058804413781525615,
                "softmax_loss": 0.058804413781525615,
                "loss": 0.058804413781525615
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.12644969334808712,
                "softmax_loss": 0.12644969334808712,
                "loss": 0.12644969334808712
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.676284549570218,
                "softmax_loss": 2.676284549570218,
                "loss": 2.676284549570218
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 6,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 3.3354350135336346,
                "softmax_loss": 3.3354350135336346,
                "loss": 3.3354350135336346
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.23659718173575656,
                "softmax_loss": 0.23659718173575656,
                "loss": 0.23659718173575656
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.003677394319292093,
                "softmax_loss": 0.003677394319292093,
                "loss": 0.003677394319292093
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.08621668868876303,
                "softmax_loss": 0.08621668868876303,
                "loss": 0.08621668868876303
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.03481995720235832,
                "softmax_loss": 0.03481995720235832,
                "loss": 0.03481995720235832
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.1863554214512223,
                "softmax_loss": 0.1863554214512223,
                "loss": 0.1863554214512223
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.026547789653240044,
                "softmax_loss": 0.026547789653240044,
                "loss": 0.026547789653240044
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.07722142523451375,
                "softmax_loss": 0.07722142523451375,
                "loss": 0.07722142523451375
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 5.058294511454991,
                "softmax_loss": 5.058294511454991,
                "loss": 5.058294511454991
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.11366922488620582,
                "softmax_loss": 0.11366922488620582,
                "loss": 0.11366922488620582
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 2.4226439177919037,
                "softmax_loss": 2.4226439177919037,
                "loss": 2.4226439177919037
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.017935378526780947,
                "softmax_loss": 0.017935378526780947,
                "loss": 0.017935378526780947
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.9041714642763335,
                "softmax_loss": 0.9041714642763335,
                "loss": 0.9041714642763335
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.7692206887254536,
                "softmax_loss": 0.7692206887254536,
                "loss": 0.7692206887254536
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.5632500329361043,
                "softmax_loss": 0.5632500329361043,
                "loss": 0.5632500329361043
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.22463637173428552,
                "softmax_loss": 0.22463637173428552,
                "loss": 0.22463637173428552
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.05486795878502785,
                "softmax_loss": 0.05486795878502785,
                "loss": 0.05486795878502785
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.0331920602328922,
                "softmax_loss": 0.0331920602328922,
                "loss": 0.0331920602328922
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.0085138650492754,
                "softmax_loss": 0.0085138650492754,
                "loss": 0.0085138650492754
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 10,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.012845888462416707,
                "softmax_loss": 0.012845888462416707,
                "loss": 0.012845888462416707
            }
        ],
        [
            {
                "fwd_time": 4,
                "bwd_time": 8,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.23007570088912965,
                "softmax_loss": 0.23007570088912965,
                "loss": 0.23007570088912965
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.10458186815918138,
                "softmax_loss": 0.10458186815918138,
                "loss": 0.10458186815918138
            }
        ],
        [
            {
                "fwd_time": 5,
                "bwd_time": 7,
                "l2_decay_loss": 0,
                "l1_decay_loss": 0,
                "cost_loss": 0.03422416015033126,
                "softmax_loss": 0.03422416015033126,
                "loss": 0.03422416015033126
            }
        ]
    ]}

    let height = canvas.clientHeight
    let points = model.stats.length
    let pxlDlta = height / points


    const max = Math.max(...model.stats.map((stat) => stat.loss));

    for (let i = 0; i < points - 1; i++) {
        ctx.moveTo(pxlDlta * i, 1 - model.stats[i][0].loss)
        ctx.lineTo(pxlDlta * (i + 1), 1 - model.stats[i + 1][0].loss)
        ctx.stroke();
    }
    //ctx.moveTo(0,0)
    //ctx.lineTo(canvas.clientWidth * 0.5, canvas.offsetHeight * (100 - model.stats[0][0].loss) / 100)
    //ctx.stroke();

    return;
}