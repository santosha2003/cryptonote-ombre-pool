var fs = require('fs');

var configFile = (function(){
    for (var i = 0; i < process.argv.length; i++){
        if (process.argv[i].indexOf('-config=') === 0)
            return process.argv[i].split('=')[1];
    }
    return 'config.json';
})();


try {
    global.config = JSON.parse(fs.readFileSync(configFile));
}
catch(e){
    console.error('Failed to read config file ' + configFile + '\n\n' + e);
    return;
}

var donationAddresses = {
    devDonation: {
        XMR: '45Jmf8PnJKziGyrLouJMeBFw2yVyX1QB52sKEQ4S1VSU2NVsaVGPNu4bWKkaHaeZ6tWCepP6iceZk8XhTLzDaEVa72QrtVh',
        OMB: 'cashKNy8CZmCkzsiJDD15t66cTCwQP61iPx82GqS4FkyHtPrfcjgCk7ZNZhLbp6rtW98yPp9RTpi7VzSHDUauiRx9QxuKiGdr4'
    },
    coreDevDonation: {
        BCN: '252m7ru3wT5McAUztrZDExJ9PgnmyJVgk2ayucQLt13dFrf5DE4SrSBVkbtVhvZbRj1Ty4cVWaE6MGDVArZLpuMhCkrvToA',
        SUMO: 'Sumoo55Uuha92txrQHUcBVC3LcBqtEGLHPa8u9P8RXWyGNaCDtfjMF4BJLkhfhz5WT4Rwj7qdQDP6jXhy2iy19Quc4XrauByMPw'
    },
    extraFeaturesDevDonation: {
        BCN: '23emzdEQqoWAifE1ZQLTrGAmVkdzjami82xgX4zWoX2VbiuGuunMJ1oF14PPa1cVRgGFz8tUWevsSNzMcPqHiQmF7iSzS1g'
    }
};

global.donations = {};

for(var configOption in donationAddresses) {
    var percent = config.blockUnlocker[configOption];
    var wallet = donationAddresses[configOption][config.symbol];
    if(percent && wallet) {
        global.donations[wallet] = percent;
    }
}

global.version = "v1.1.5_uni";
