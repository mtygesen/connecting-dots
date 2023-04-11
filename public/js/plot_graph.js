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
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.1458434105071236,
            "softmax_loss": 2.1458434105071236,
            "loss": 2.1458434105071236
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.4776155990241846,
            "softmax_loss": 2.4776155990241846,
            "loss": 2.4776155990241846
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.3774817959044205,
            "softmax_loss": 2.3774817959044205,
            "loss": 2.3774817959044205
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.0533814828583417,
            "softmax_loss": 2.0533814828583417,
            "loss": 2.0533814828583417
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.9177822030395442,
            "softmax_loss": 1.9177822030395442,
            "loss": 1.9177822030395442
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.3436854957241486,
            "softmax_loss": 2.3436854957241486,
            "loss": 2.3436854957241486
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.2929061390416385,
            "softmax_loss": 2.2929061390416385,
            "loss": 2.2929061390416385
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.6465204508664977,
            "softmax_loss": 2.6465204508664977,
            "loss": 2.6465204508664977
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.8433832782270254,
            "softmax_loss": 1.8433832782270254,
            "loss": 1.8433832782270254
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 3.5504074043436975,
            "softmax_loss": 3.5504074043436975,
            "loss": 3.5504074043436975
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.8987516799185213,
            "softmax_loss": 2.8987516799185213,
            "loss": 2.8987516799185213
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.708079781079273,
            "softmax_loss": 1.708079781079273,
            "loss": 1.708079781079273
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.8890729165703064,
            "softmax_loss": 1.8890729165703064,
            "loss": 1.8890729165703064
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.254475349214435,
            "softmax_loss": 2.254475349214435,
            "loss": 2.254475349214435
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.670670311271751,
            "softmax_loss": 1.670670311271751,
            "loss": 1.670670311271751
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.6974621327364714,
            "softmax_loss": 2.6974621327364714,
            "loss": 2.6974621327364714
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.6488119054724343,
            "softmax_loss": 0.6488119054724343,
            "loss": 0.6488119054724343
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.6917254494240428,
            "softmax_loss": 1.6917254494240428,
            "loss": 1.6917254494240428
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.2760721659007146,
            "softmax_loss": 1.2760721659007146,
            "loss": 1.2760721659007146
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.6332335206279455,
            "softmax_loss": 0.6332335206279455,
            "loss": 0.6332335206279455
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.10474451062756972,
            "softmax_loss": 0.10474451062756972,
            "loss": 0.10474451062756972
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.5171458851596014,
            "softmax_loss": 1.5171458851596014,
            "loss": 1.5171458851596014
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.1391080874838564,
            "softmax_loss": 1.1391080874838564,
            "loss": 1.1391080874838564
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.521109964199914,
            "softmax_loss": 2.521109964199914,
            "loss": 2.521109964199914
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.6575622381260126,
            "softmax_loss": 0.6575622381260126,
            "loss": 0.6575622381260126
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.9396803241721723,
            "softmax_loss": 2.9396803241721723,
            "loss": 2.9396803241721723
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.23854158727204966,
            "softmax_loss": 0.23854158727204966,
            "loss": 0.23854158727204966
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.8189568192059156,
            "softmax_loss": 1.8189568192059156,
            "loss": 1.8189568192059156
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0807685530073883,
            "softmax_loss": 0.0807685530073883,
            "loss": 0.0807685530073883
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.8323495763526987,
            "softmax_loss": 1.8323495763526987,
            "loss": 1.8323495763526987
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.23298351917023222,
            "softmax_loss": 0.23298351917023222,
            "loss": 0.23298351917023222
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.07300673150287769,
            "softmax_loss": 0.07300673150287769,
            "loss": 0.07300673150287769
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.2867814515451013,
            "softmax_loss": 0.2867814515451013,
            "loss": 0.2867814515451013
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.247529282322683,
            "softmax_loss": 2.247529282322683,
            "loss": 2.247529282322683
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.03277111109205339,
            "softmax_loss": 0.03277111109205339,
            "loss": 0.03277111109205339
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.9095741451559808,
            "softmax_loss": 0.9095741451559808,
            "loss": 0.9095741451559808
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.7481605679808156,
            "softmax_loss": 1.7481605679808156,
            "loss": 1.7481605679808156
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.078007318359019,
            "softmax_loss": 0.078007318359019,
            "loss": 0.078007318359019
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.3445874745189574,
            "softmax_loss": 1.3445874745189574,
            "loss": 1.3445874745189574
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0009112474049963439,
            "softmax_loss": 0.0009112474049963439,
            "loss": 0.0009112474049963439
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.07339333375945405,
            "softmax_loss": 0.07339333375945405,
            "loss": 0.07339333375945405
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 3.722805005527059,
            "softmax_loss": 3.722805005527059,
            "loss": 3.722805005527059
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.2968887561841887,
            "softmax_loss": 0.2968887561841887,
            "loss": 0.2968887561841887
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.08378084340870098,
            "softmax_loss": 0.08378084340870098,
            "loss": 0.08378084340870098
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.007087710613668534,
            "softmax_loss": 0.007087710613668534,
            "loss": 0.007087710613668534
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.4345588432735912,
            "softmax_loss": 1.4345588432735912,
            "loss": 1.4345588432735912
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.12838258772437916,
            "softmax_loss": 0.12838258772437916,
            "loss": 0.12838258772437916
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.37556553164552453,
            "softmax_loss": 0.37556553164552453,
            "loss": 0.37556553164552453
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0015605063717648064,
            "softmax_loss": 0.0015605063717648064,
            "loss": 0.0015605063717648064
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 7.12925270515325,
            "softmax_loss": 7.12925270515325,
            "loss": 7.12925270515325
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.04573541299106837,
            "softmax_loss": 0.04573541299106837,
            "loss": 0.04573541299106837
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.08641859735173216,
            "softmax_loss": 0.08641859735173216,
            "loss": 0.08641859735173216
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.1270394647475185,
            "softmax_loss": 0.1270394647475185,
            "loss": 0.1270394647475185
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.9412076855308205,
            "softmax_loss": 1.9412076855308205,
            "loss": 1.9412076855308205
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.2843927235126641,
            "softmax_loss": 0.2843927235126641,
            "loss": 0.2843927235126641
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.5238327017576173,
            "softmax_loss": 0.5238327017576173,
            "loss": 0.5238327017576173
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.6245871781654948,
            "softmax_loss": 1.6245871781654948,
            "loss": 1.6245871781654948
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.440689370444455,
            "softmax_loss": 1.440689370444455,
            "loss": 1.440689370444455
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.236089194189264,
            "softmax_loss": 1.236089194189264,
            "loss": 1.236089194189264
        },
        {
            "fwd_time": 5,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.08191386220582705,
            "softmax_loss": 0.08191386220582705,
            "loss": 0.08191386220582705
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.7230041832126073,
            "softmax_loss": 1.7230041832126073,
            "loss": 1.7230041832126073
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.014395851659692913,
            "softmax_loss": 0.014395851659692913,
            "loss": 0.014395851659692913
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.3035292799561689,
            "softmax_loss": 0.3035292799561689,
            "loss": 0.3035292799561689
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0018072962501714794,
            "softmax_loss": 0.0018072962501714794,
            "loss": 0.0018072962501714794
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.07501039609672344,
            "softmax_loss": 0.07501039609672344,
            "loss": 0.07501039609672344
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.008462443068495978,
            "softmax_loss": 0.008462443068495978,
            "loss": 0.008462443068495978
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 6.501207809103939,
            "softmax_loss": 6.501207809103939,
            "loss": 6.501207809103939
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.032345059303966195,
            "softmax_loss": 0.032345059303966195,
            "loss": 0.032345059303966195
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.26326375860630646,
            "softmax_loss": 0.26326375860630646,
            "loss": 0.26326375860630646
        },
        {
            "fwd_time": 4,
            "bwd_time": 8,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.3386369885318026,
            "softmax_loss": 0.3386369885318026,
            "loss": 0.3386369885318026
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.07368430140685836,
            "softmax_loss": 0.07368430140685836,
            "loss": 0.07368430140685836
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.505186041004348,
            "softmax_loss": 2.505186041004348,
            "loss": 2.505186041004348
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.39776244329259114,
            "softmax_loss": 0.39776244329259114,
            "loss": 0.39776244329259114
        },
        {
            "fwd_time": 5,
            "bwd_time": 9,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.7785315667880507,
            "softmax_loss": 0.7785315667880507,
            "loss": 0.7785315667880507
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.07341321068567064,
            "softmax_loss": 0.07341321068567064,
            "loss": 0.07341321068567064
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.8467523788637628,
            "softmax_loss": 0.8467523788637628,
            "loss": 0.8467523788637628
        },
        {
            "fwd_time": 6,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.9568656163830456,
            "softmax_loss": 1.9568656163830456,
            "loss": 1.9568656163830456
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.16560658694205194,
            "softmax_loss": 0.16560658694205194,
            "loss": 0.16560658694205194
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.001109845178595866,
            "softmax_loss": 0.001109845178595866,
            "loss": 0.001109845178595866
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.008845236881435528,
            "softmax_loss": 0.008845236881435528,
            "loss": 0.008845236881435528
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0016619322787312957,
            "softmax_loss": 0.0016619322787312957,
            "loss": 0.0016619322787312957
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.04096879556947448,
            "softmax_loss": 0.04096879556947448,
            "loss": 0.04096879556947448
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0018315807450281403,
            "softmax_loss": 0.0018315807450281403,
            "loss": 0.0018315807450281403
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.18611216509903988,
            "softmax_loss": 0.18611216509903988,
            "loss": 0.18611216509903988
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 3.8850007662335244,
            "softmax_loss": 3.8850007662335244,
            "loss": 3.8850007662335244
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.010653962276605115,
            "softmax_loss": 0.010653962276605115,
            "loss": 0.010653962276605115
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 2.6876296514259055,
            "softmax_loss": 2.6876296514259055,
            "loss": 2.6876296514259055
        },
        {
            "fwd_time": 5,
            "bwd_time": 8,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.00017344758454208734,
            "softmax_loss": 0.00017344758454208734,
            "loss": 0.00017344758454208734
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 1.8041245608200196,
            "softmax_loss": 1.8041245608200196,
            "loss": 1.8041245608200196
        },
        {
            "fwd_time": 3,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.47820990467235225,
            "softmax_loss": 0.47820990467235225,
            "loss": 0.47820990467235225
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.10920168364953306,
            "softmax_loss": 0.10920168364953306,
            "loss": 0.10920168364953306
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.052394030324284684,
            "softmax_loss": 0.052394030324284684,
            "loss": 0.052394030324284684
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.3786356648673411,
            "softmax_loss": 0.3786356648673411,
            "loss": 0.3786356648673411
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0628381703591877,
            "softmax_loss": 0.0628381703591877,
            "loss": 0.0628381703591877
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0007394709065461858,
            "softmax_loss": 0.0007394709065461858,
            "loss": 0.0007394709065461858
        },
        {
            "fwd_time": 4,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.0004341784548551752,
            "softmax_loss": 0.0004341784548551752,
            "loss": 0.0004341784548551752
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.30673560899071584,
            "softmax_loss": 0.30673560899071584,
            "loss": 0.30673560899071584
        },
        {
            "fwd_time": 5,
            "bwd_time": 6,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.007261921415633907,
            "softmax_loss": 0.007261921415633907,
            "loss": 0.007261921415633907
        },
        {
            "fwd_time": 4,
            "bwd_time": 7,
            "l2_decay_loss": 0,
            "l1_decay_loss": 0,
            "cost_loss": 0.10805403979994561,
            "softmax_loss": 0.10805403979994561,
            "loss": 0.10805403979994561
        }]}

    let height = canvas.clientHeight
    let points = model.stats.length
    let pxlDlta = canvas.clientWidth / (points - 1) //there are points - 1 lines


    const max = Math.max(...model.stats.map((stat) => stat.loss));
    console.log("max is " + max)

    for (let i = 0; i < points - 1; i++) {
        ctx.moveTo(pxlDlta * i, (1 - model.stats[i].loss / max) * height)
        ctx.lineTo(pxlDlta * (i + 1), (1 - model.stats[i + 1].loss / max) * height)
        ctx.stroke();
        console.log("[" + i + "] " + pxlDlta * i + "," + (1 - model.stats[i].loss / max) * height)
    }

    return;
}