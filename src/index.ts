/**
 * Show or hide a map layer based on the state of a checkbox.
 *
 * The layer will be switched between the display types `block` and `none`.
 *
 * This function is a callback factory and will return a closure with the
 * despired properties that can be hooked onto the checkbox's `'click'` event.
 *
 * @param checkbox Checkbox controlling the map layer's visibility
 * @param layer Map layer to show or hide
 */
function toggleMapLayer(checkbox: HTMLInputElement, layer: HTMLDivElement): () => void {
    return function (): void {
        layer.style.display = checkbox.checked ? "block" : "none";
    }
}


// Horrible, hard-coded string SVGs
// These will be retrieved via the API at a later stage.
const svg_strings = '<svg><polygon points="-1905.26,2800.0 -1818.65,2750.0 -1732.05,2800.0 -1645.45,2750.0 -1558.85,2800.0 -1472.24,2750.0 -1472.24,2650.0 -1385.64,2600.0 -1299.04,2650.0 -1212.44,2600.0 -1212.44,2500.0 -1299.04,2450.0 -1299.04,2350.0 -1385.64,2300.0 -1385.64,2200.0 -1472.24,2150.0 -1472.24,2050.0 -1558.85,2000.0 -1645.45,2050.0 -1732.05,2000.0 -1818.65,2050.0 -1905.26,2000.0 -1991.86,2050.0 -2078.46,2000.0 -2165.06,2050.0 -2251.67,2000.0 -2338.27,2050.0 -2338.27,2150.0 -2424.87,2200.0 -2424.87,2300.0 -2338.27,2350.0 -2338.27,2450.0 -2251.67,2500.0 -2251.67,2600.0 -2165.06,2650.0 -2165.06,2750.0 -2078.46,2800.0 -1991.86,2750.0" /></svg><svg><polygon points="2944.49,2200.0 3031.09,2150.0 3031.09,2050.0 2944.49,2000.0 2944.49,1900.0 2857.88,1850.0 2857.88,1750.0 2944.49,1700.0 2944.49,1600.0 2857.88,1550.0 2771.28,1600.0 2684.68,1550.0 2598.08,1600.0 2511.47,1550.0 2424.87,1600.0 2338.27,1550.0 2251.67,1600.0 2251.67,1700.0 2165.06,1750.0 2165.06,1850.0 2078.46,1900.0 2078.46,2000.0 2165.06,2050.0 2165.06,2150.0 2251.67,2200.0 2251.67,2300.0 2338.27,2350.0 2338.27,2450.0 2424.87,2500.0 2511.47,2450.0 2598.08,2500.0 2684.68,2450.0 2771.28,2500.0 2857.88,2450.0 2857.88,2350.0 2944.49,2300.0" /></svg><svg><polygon points="1039.23,-2500.0 952.63,-2450.0 952.63,-2350.0 866.03,-2300.0 779.42,-2350.0 692.82,-2300.0 606.22,-2350.0 519.62,-2300.0 433.01,-2350.0 433.01,-2450.0 346.41,-2500.0 259.81,-2450.0 173.21,-2500.0 173.21,-2600.0 86.6,-2650.0 86.6,-2750.0 -0.0,-2800.0 0.0,-2900.0 86.6,-2950.0 173.21,-2900.0 259.81,-2950.0 346.41,-2900.0 433.01,-2950.0 519.62,-2900.0 606.22,-2950.0 692.82,-2900.0 779.42,-2950.0 866.03,-2900.0 866.03,-2800.0 952.63,-2750.0 1039.23,-2800.0 1125.83,-2750.0 1125.83,-2650.0 1039.23,-2600.0" /></svg><svg><polygon points="-1905.26,800.0 -1991.86,850.0 -2078.46,800.0 -2165.06,850.0 -2165.06,950.0 -2251.67,1000.0 -2251.67,1100.0 -2165.06,1150.0 -2165.06,1250.0 -2251.67,1300.0 -2251.67,1400.0 -2165.06,1450.0 -2165.06,1550.0 -2078.46,1600.0 -1991.86,1550.0 -1991.86,1450.0 -1905.26,1400.0 -1818.65,1450.0 -1732.05,1400.0 -1732.05,1300.0 -1645.45,1250.0 -1645.45,1150.0 -1732.05,1100.0 -1732.05,1000.0 -1818.65,950.0 -1818.65,850.0" /></svg><svg><polygon points="-346.41,1100.0 -259.81,1150.0 -259.81,1250.0 -346.41,1300.0 -346.41,1400.0 -433.01,1450.0 -519.62,1400.0 -519.62,1300.0 -606.22,1250.0 -606.22,1150.0 -519.62,1100.0 -433.01,1150.0" /></svg><svg><polygon points="-1905.26,-200.0 -1818.65,-250.0 -1818.65,-350.0 -1732.05,-400.0 -1732.05,-500.0 -1645.45,-550.0 -1558.85,-500.0 -1558.85,-400.0 -1472.24,-350.0 -1472.24,-250.0 -1385.64,-200.0 -1385.64,-100.0 -1299.04,-50.0 -1299.04,50.0 -1385.64,100.0 -1472.24,50.0 -1558.85,100.0 -1645.45,50.0 -1732.05,100.0 -1818.65,50.0 -1905.26,100.0 -1991.86,50.0 -1991.86,-50.0 -1905.26,-100.0" /></svg><svg><polygon points="866.03,1700.0 866.03,1600.0 779.42,1550.0 779.42,1450.0 866.03,1400.0 952.63,1450.0 1039.23,1400.0 1125.83,1450.0 1212.44,1400.0 1299.04,1450.0 1299.04,1550.0 1212.44,1600.0 1212.44,1700.0 1299.04,1750.0 1299.04,1850.0 1212.44,1900.0 1212.44,2000.0 1125.83,2050.0 1125.83,2150.0 1039.23,2200.0 952.63,2150.0 952.63,2050.0 866.03,2000.0 866.03,1900.0 779.42,1850.0 779.42,1750.0" /></svg><svg><polygon points="1472.24,350.0 1558.85,400.0 1558.85,500.0 1645.45,550.0 1732.05,500.0 1732.05,400.0 1818.65,350.0 1818.65,250.0 1905.26,200.0 1905.26,100.0 1818.65,50.0 1732.05,100.0 1645.45,50.0 1558.85,100.0 1472.24,50.0 1472.24,-50.0 1385.64,-100.0 1385.64,-200.0 1299.04,-250.0 1212.44,-200.0 1125.83,-250.0 1039.23,-200.0 952.63,-250.0 866.03,-200.0 779.42,-250.0 692.82,-200.0 692.82,-100.0 606.22,-50.0 606.22,50.0 692.82,100.0 692.82,200.0 779.42,250.0 866.03,200.0 952.63,250.0 1039.23,200.0 1125.83,250.0 1125.83,350.0 1212.44,400.0 1299.04,350.0 1385.64,400.0" /></svg><svg><polygon points="2251.67,100.0 2251.67,200.0 2165.06,250.0 2165.06,350.0 2251.67,400.0 2338.27,350.0 2424.87,400.0 2511.47,350.0 2511.47,250.0 2598.08,200.0 2598.08,100.0 2511.47,50.0 2424.87,100.0 2338.27,50.0" /></svg><svg><polygon points="-1732.05,-1600.0 -1818.65,-1550.0 -1905.26,-1600.0 -1991.86,-1550.0 -2078.46,-1600.0 -2078.46,-1700.0 -2165.06,-1750.0 -2165.06,-1850.0 -2078.46,-1900.0 -2078.46,-2000.0 -2165.06,-2050.0 -2165.06,-2150.0 -2078.46,-2200.0 -1991.86,-2150.0 -1905.26,-2200.0 -1905.26,-2300.0 -1818.65,-2350.0 -1732.05,-2300.0 -1732.05,-2200.0 -1645.45,-2150.0 -1645.45,-2050.0 -1732.05,-2000.0 -1732.05,-1900.0 -1645.45,-1850.0 -1645.45,-1750.0 -1558.85,-1700.0 -1558.85,-1600.0 -1645.45,-1550.0" /></svg><svg><polygon points="-692.82,-1600.0 -692.82,-1700.0 -779.42,-1750.0 -779.42,-1850.0 -692.82,-1900.0 -692.82,-2000.0 -606.22,-2050.0 -519.62,-2000.0 -433.01,-2050.0 -346.41,-2000.0 -259.81,-2050.0 -173.21,-2000.0 -86.6,-2050.0 -0.0,-2000.0 0.0,-1900.0 -86.6,-1850.0 -86.6,-1750.0 -173.21,-1700.0 -173.21,-1600.0 -259.81,-1550.0 -259.81,-1450.0 -346.41,-1400.0 -433.01,-1450.0 -519.62,-1400.0 -606.22,-1450.0 -606.22,-1550.0" /></svg><svg><polygon points="2165.06,-1250.0 2251.67,-1300.0 2251.67,-1400.0 2165.06,-1450.0 2165.06,-1550.0 2078.46,-1600.0 1991.86,-1550.0 1905.26,-1600.0 1818.65,-1550.0 1818.65,-1450.0 1905.26,-1400.0 1905.26,-1300.0 1991.86,-1250.0 2078.46,-1300.0" /></svg><svg><polygon points="-1212.44,1700.0 -1299.04,1750.0 -1299.04,1850.0 -1212.44,1900.0 -1212.44,2000.0 -1125.83,2050.0 -1039.23,2000.0 -952.63,2050.0 -866.03,2000.0 -779.42,2050.0 -692.82,2000.0 -606.22,2050.0 -519.62,2000.0 -519.62,1900.0 -606.22,1850.0 -606.22,1750.0 -692.82,1700.0 -692.82,1600.0 -779.42,1550.0 -779.42,1450.0 -866.03,1400.0 -952.63,1450.0 -1039.23,1400.0 -1125.83,1450.0 -1125.83,1550.0 -1212.44,1600.0" /></svg><svg><polygon points="0.0,1600.0 86.6,1550.0 86.6,1450.0 173.21,1400.0 173.21,1300.0 259.81,1250.0 346.41,1300.0 433.01,1250.0 519.62,1300.0 606.22,1250.0 692.82,1300.0 692.82,1400.0 606.22,1450.0 606.22,1550.0 519.62,1600.0 519.62,1700.0 606.22,1750.0 606.22,1850.0 519.62,1900.0 519.62,2000.0 433.01,2050.0 346.41,2000.0 259.81,2050.0 173.21,2000.0 173.21,1900.0 86.6,1850.0 86.6,1750.0 -0.0,1700.0" /></svg><svg><polygon points="2857.88,1150.0 2771.28,1100.0 2771.28,1000.0 2857.88,950.0 2857.88,850.0 2771.28,800.0 2771.28,700.0 2684.68,650.0 2598.08,700.0 2598.08,800.0 2511.47,850.0 2424.87,800.0 2338.27,850.0 2251.67,800.0 2165.06,850.0 2165.06,950.0 2251.67,1000.0 2251.67,1100.0 2338.27,1150.0 2338.27,1250.0 2424.87,1300.0 2424.87,1400.0 2511.47,1450.0 2511.47,1550.0 2598.08,1600.0 2684.68,1550.0 2771.28,1600.0 2857.88,1550.0 2944.49,1600.0 3031.09,1550.0 3031.09,1450.0 2944.49,1400.0 2944.49,1300.0 2857.88,1250.0" /></svg><svg><polygon points="1039.23,800.0 1039.23,700.0 952.63,650.0 952.63,550.0 866.03,500.0 779.42,550.0 692.82,500.0 692.82,400.0 606.22,350.0 519.62,400.0 519.62,500.0 433.01,550.0 346.41,500.0 259.81,550.0 259.81,650.0 346.41,700.0 346.41,800.0 433.01,850.0 433.01,950.0 519.62,1000.0 519.62,1100.0 606.22,1150.0 606.22,1250.0 692.82,1300.0 779.42,1250.0 779.42,1150.0 866.03,1100.0 866.03,1000.0 952.63,950.0 952.63,850.0" /></svg><svg><polygon points="-86.6,250.0 -173.21,200.0 -173.21,100.0 -259.81,50.0 -259.81,-50.0 -346.41,-100.0 -433.01,-50.0 -519.62,-100.0 -606.22,-50.0 -692.82,-100.0 -779.42,-50.0 -779.42,50.0 -692.82,100.0 -692.82,200.0 -779.42,250.0 -779.42,350.0 -866.03,400.0 -866.03,500.0 -779.42,550.0 -779.42,650.0 -692.82,700.0 -692.82,800.0 -606.22,850.0 -519.62,800.0 -433.01,850.0 -346.41,800.0 -259.81,850.0 -173.21,800.0 -173.21,700.0 -86.6,650.0 -86.6,550.0 0.0,500.0 -0.0,400.0 -86.6,350.0" /></svg><svg><polygon points="173.21,-1400.0 86.6,-1450.0 86.6,-1550.0 173.21,-1600.0 259.81,-1550.0 259.81,-1450.0 346.41,-1400.0 433.01,-1450.0 519.62,-1400.0 606.22,-1450.0 692.82,-1400.0 779.42,-1450.0 866.03,-1400.0 952.63,-1450.0 1039.23,-1400.0 1039.23,-1300.0 952.63,-1250.0 952.63,-1150.0 866.03,-1100.0 866.03,-1000.0 779.42,-950.0 779.42,-850.0 692.82,-800.0 606.22,-850.0 519.62,-800.0 433.01,-850.0 346.41,-800.0 259.81,-850.0 173.21,-800.0 86.6,-850.0 86.6,-950.0 -0.0,-1000.0 0.0,-1100.0 86.6,-1150.0 86.6,-1250.0 173.21,-1300.0" /></svg><svg><polygon points="1299.04,-550.0 1385.64,-500.0 1472.24,-550.0 1558.85,-500.0 1645.45,-550.0 1732.05,-500.0 1818.65,-550.0 1905.26,-500.0 1991.86,-550.0 1991.86,-650.0 2078.46,-700.0 2078.46,-800.0 1991.86,-850.0 1991.86,-950.0 1905.26,-1000.0 1818.65,-950.0 1732.05,-1000.0 1645.45,-950.0 1558.85,-1000.0 1472.24,-950.0 1385.64,-1000.0 1299.04,-950.0 1299.04,-850.0 1385.64,-800.0 1385.64,-700.0 1299.04,-650.0" /></svg><svg><polygon points="-1818.65,-550.0 -1818.65,-650.0 -1905.26,-700.0 -1905.26,-800.0 -1991.86,-850.0 -1991.86,-950.0 -2078.46,-1000.0 -2078.46,-1100.0 -1991.86,-1150.0 -1905.26,-1100.0 -1818.65,-1150.0 -1818.65,-1250.0 -1732.05,-1300.0 -1645.45,-1250.0 -1558.85,-1300.0 -1558.85,-1400.0 -1472.24,-1450.0 -1385.64,-1400.0 -1299.04,-1450.0 -1212.44,-1400.0 -1125.83,-1450.0 -1039.23,-1400.0 -1039.23,-1300.0 -1125.83,-1250.0 -1125.83,-1150.0 -1039.23,-1100.0 -1039.23,-1000.0 -1125.83,-950.0 -1125.83,-850.0 -1212.44,-800.0 -1212.44,-700.0 -1299.04,-650.0 -1385.64,-700.0 -1472.24,-650.0 -1472.24,-550.0 -1558.85,-500.0 -1645.45,-550.0 -1732.05,-500.0" /></svg><svg><polygon points="1039.23,-1600.0 1039.23,-1700.0 952.63,-1750.0 952.63,-1850.0 1039.23,-1900.0 1125.83,-1850.0 1212.44,-1900.0 1299.04,-1850.0 1385.64,-1900.0 1472.24,-1850.0 1558.85,-1900.0 1645.45,-1850.0 1645.45,-1750.0 1732.05,-1700.0 1732.05,-1600.0 1645.45,-1550.0 1645.45,-1450.0 1558.85,-1400.0 1558.85,-1300.0 1472.24,-1250.0 1385.64,-1300.0 1299.04,-1250.0 1212.44,-1300.0 1125.83,-1250.0 1039.23,-1300.0 1039.23,-1400.0 1125.83,-1450.0 1125.83,-1550.0" /></svg><svg><polygon points="-1472.24,2050.0 -1385.64,2000.0 -1385.64,1900.0 -1299.04,1850.0 -1212.44,1900.0 -1212.44,2000.0 -1125.83,2050.0 -1039.23,2000.0 -952.63,2050.0 -866.03,2000.0 -779.42,2050.0 -692.82,2000.0 -606.22,2050.0 -606.22,2150.0 -519.62,2200.0 -519.62,2300.0 -606.22,2350.0 -606.22,2450.0 -692.82,2500.0 -779.42,2450.0 -866.03,2500.0 -866.03,2600.0 -952.63,2650.0 -1039.23,2600.0 -1125.83,2650.0 -1212.44,2600.0 -1212.44,2500.0 -1299.04,2450.0 -1299.04,2350.0 -1385.64,2300.0 -1385.64,2200.0 -1472.24,2150.0" /></svg><svg><polygon points="-0.0,2200.0 -86.6,2150.0 -173.21,2200.0 -259.81,2150.0 -346.41,2200.0 -433.01,2150.0 -519.62,2200.0 -519.62,2300.0 -606.22,2350.0 -606.22,2450.0 -519.62,2500.0 -433.01,2450.0 -346.41,2500.0 -259.81,2450.0 -173.21,2500.0 -86.6,2450.0 0.0,2500.0 86.6,2450.0 173.21,2500.0 259.81,2450.0 259.81,2350.0 173.21,2300.0 173.21,2200.0 86.6,2150.0" /></svg><svg><polygon points="2338.27,2350.0 2338.27,2450.0 2251.67,2500.0 2165.06,2450.0 2078.46,2500.0 1991.86,2450.0 1905.26,2500.0 1818.65,2450.0 1732.05,2500.0 1645.45,2450.0 1645.45,2350.0 1732.05,2300.0 1732.05,2200.0 1645.45,2150.0 1645.45,2050.0 1732.05,2000.0 1732.05,1900.0 1818.65,1850.0 1905.26,1900.0 1991.86,1850.0 2078.46,1900.0 2078.46,2000.0 2165.06,2050.0 2165.06,2150.0 2251.67,2200.0 2251.67,2300.0" /></svg><svg><polygon points="1732.05,2300.0 1732.05,2200.0 1645.45,2150.0 1645.45,2050.0 1558.85,2000.0 1472.24,2050.0 1472.24,2150.0 1385.64,2200.0 1299.04,2150.0 1212.44,2200.0 1212.44,2300.0 1125.83,2350.0 1125.83,2450.0 1212.44,2500.0 1299.04,2450.0 1385.64,2500.0 1472.24,2450.0 1558.85,2500.0 1645.45,2450.0 1645.45,2350.0" /></svg><svg><polygon points="-2338.27,1550.0 -2251.67,1600.0 -2165.06,1550.0 -2078.46,1600.0 -2078.46,1700.0 -1991.86,1750.0 -1991.86,1850.0 -1905.26,1900.0 -1905.26,2000.0 -1991.86,2050.0 -2078.46,2000.0 -2165.06,2050.0 -2251.67,2000.0 -2338.27,2050.0 -2338.27,2150.0 -2424.87,2200.0 -2511.47,2150.0 -2511.47,2050.0 -2598.08,2000.0 -2598.08,1900.0 -2684.68,1850.0 -2684.68,1750.0 -2771.28,1700.0 -2771.28,1600.0 -2684.68,1550.0 -2598.08,1600.0 -2511.47,1550.0 -2424.87,1600.0" /></svg><svg><polygon points="-2078.46,1700.0 -1991.86,1750.0 -1991.86,1850.0 -1905.26,1900.0 -1905.26,2000.0 -1818.65,2050.0 -1732.05,2000.0 -1645.45,2050.0 -1558.85,2000.0 -1472.24,2050.0 -1385.64,2000.0 -1385.64,1900.0 -1299.04,1850.0 -1299.04,1750.0 -1212.44,1700.0 -1212.44,1600.0 -1125.83,1550.0 -1125.83,1450.0 -1212.44,1400.0 -1299.04,1450.0 -1385.64,1400.0 -1385.64,1300.0 -1472.24,1250.0 -1558.85,1300.0 -1645.45,1250.0 -1732.05,1300.0 -1732.05,1400.0 -1818.65,1450.0 -1905.26,1400.0 -1991.86,1450.0 -1991.86,1550.0 -2078.46,1600.0" /></svg><svg><polygon points="-173.21,700.0 -86.6,650.0 -86.6,550.0 -0.0,500.0 0.0,400.0 86.6,350.0 173.21,400.0 173.21,500.0 259.81,550.0 259.81,650.0 346.41,700.0 346.41,800.0 433.01,850.0 433.01,950.0 519.62,1000.0 519.62,1100.0 606.22,1150.0 606.22,1250.0 519.62,1300.0 433.01,1250.0 346.41,1300.0 259.81,1250.0 259.81,1150.0 173.21,1100.0 86.6,1150.0 -0.0,1100.0 0.0,1000.0 -86.6,950.0 -86.6,850.0 -173.21,800.0" /></svg><svg><polygon points="2165.06,1550.0 2165.06,1450.0 2078.46,1400.0 2078.46,1300.0 1991.86,1250.0 1905.26,1300.0 1818.65,1250.0 1818.65,1150.0 1732.05,1100.0 1732.05,1000.0 1645.45,950.0 1645.45,850.0 1558.85,800.0 1472.24,850.0 1472.24,950.0 1385.64,1000.0 1385.64,1100.0 1299.04,1150.0 1299.04,1250.0 1212.44,1300.0 1212.44,1400.0 1299.04,1450.0 1299.04,1550.0 1385.64,1600.0 1472.24,1550.0 1558.85,1600.0 1558.85,1700.0 1645.45,1750.0 1645.45,1850.0 1732.05,1900.0 1818.65,1850.0 1905.26,1900.0 1991.86,1850.0 2078.46,1900.0 2165.06,1850.0 2165.06,1750.0 2251.67,1700.0 2251.67,1600.0" /></svg><svg><polygon points="-2857.88,50.0 -2771.28,100.0 -2684.68,50.0 -2598.08,100.0 -2511.47,50.0 -2424.87,100.0 -2424.87,200.0 -2338.27,250.0 -2338.27,350.0 -2251.67,400.0 -2251.67,500.0 -2338.27,550.0 -2424.87,500.0 -2511.47,550.0 -2598.08,500.0 -2684.68,550.0 -2684.68,650.0 -2771.28,700.0 -2857.88,650.0 -2857.88,550.0 -2944.49,500.0 -2944.49,400.0 -2857.88,350.0 -2857.88,250.0 -2944.49,200.0 -2944.49,100.0" /></svg><svg><polygon points="-1905.26,100.0 -1991.86,50.0 -1991.86,-50.0 -1905.26,-100.0 -1905.26,-200.0 -1991.86,-250.0 -2078.46,-200.0 -2165.06,-250.0 -2251.67,-200.0 -2338.27,-250.0 -2424.87,-200.0 -2424.87,-100.0 -2511.47,-50.0 -2511.47,50.0 -2424.87,100.0 -2424.87,200.0 -2338.27,250.0 -2338.27,350.0 -2251.67,400.0 -2251.67,500.0 -2165.06,550.0 -2078.46,500.0 -1991.86,550.0 -1905.26,500.0 -1818.65,550.0 -1732.05,500.0 -1732.05,400.0 -1818.65,350.0 -1818.65,250.0 -1905.26,200.0" /></svg><svg><polygon points="-1558.85,1000.0 -1472.24,950.0 -1472.24,850.0 -1385.64,800.0 -1385.64,700.0 -1299.04,650.0 -1299.04,550.0 -1212.44,500.0 -1125.83,550.0 -1039.23,500.0 -952.63,550.0 -866.03,500.0 -779.42,550.0 -779.42,650.0 -692.82,700.0 -692.82,800.0 -606.22,850.0 -606.22,950.0 -692.82,1000.0 -692.82,1100.0 -779.42,1150.0 -779.42,1250.0 -866.03,1300.0 -866.03,1400.0 -952.63,1450.0 -1039.23,1400.0 -1125.83,1450.0 -1212.44,1400.0 -1299.04,1450.0 -1385.64,1400.0 -1385.64,1300.0 -1472.24,1250.0 -1558.85,1300.0 -1645.45,1250.0 -1645.45,1150.0 -1558.85,1100.0" /></svg><svg><polygon points="-779.42,250.0 -692.82,200.0 -692.82,100.0 -779.42,50.0 -779.42,-50.0 -866.03,-100.0 -952.63,-50.0 -1039.23,-100.0 -1125.83,-50.0 -1212.44,-100.0 -1299.04,-50.0 -1299.04,50.0 -1212.44,100.0 -1212.44,200.0 -1299.04,250.0 -1299.04,350.0 -1212.44,400.0 -1212.44,500.0 -1125.83,550.0 -1039.23,500.0 -952.63,550.0 -866.03,500.0 -866.03,400.0 -779.42,350.0" /></svg><svg><polygon points="952.63,1450.0 866.03,1400.0 779.42,1450.0 692.82,1400.0 692.82,1300.0 779.42,1250.0 779.42,1150.0 866.03,1100.0 866.03,1000.0 952.63,950.0 952.63,850.0 1039.23,800.0 1039.23,700.0 1125.83,650.0 1212.44,700.0 1299.04,650.0 1385.64,700.0 1472.24,650.0 1558.85,700.0 1558.85,800.0 1472.24,850.0 1472.24,950.0 1385.64,1000.0 1385.64,1100.0 1299.04,1150.0 1299.04,1250.0 1212.44,1300.0 1212.44,1400.0 1125.83,1450.0 1039.23,1400.0" /></svg><svg><polygon points="1818.65,1250.0 1818.65,1150.0 1732.05,1100.0 1732.05,1000.0 1645.45,950.0 1645.45,850.0 1558.85,800.0 1558.85,700.0 1472.24,650.0 1472.24,550.0 1558.85,500.0 1645.45,550.0 1732.05,500.0 1732.05,400.0 1818.65,350.0 1905.26,400.0 1905.26,500.0 1991.86,550.0 1991.86,650.0 2078.46,700.0 2165.06,650.0 2251.67,700.0 2251.67,800.0 2165.06,850.0 2165.06,950.0 2251.67,1000.0 2251.67,1100.0 2338.27,1150.0 2338.27,1250.0 2424.87,1300.0 2424.87,1400.0 2511.47,1450.0 2511.47,1550.0 2424.87,1600.0 2338.27,1550.0 2251.67,1600.0 2165.06,1550.0 2165.06,1450.0 2078.46,1400.0 2078.46,1300.0 1991.86,1250.0 1905.26,1300.0" /></svg><svg><polygon points="519.62,500.0 519.62,400.0 606.22,350.0 606.22,250.0 692.82,200.0 692.82,100.0 606.22,50.0 519.62,100.0 433.01,50.0 346.41,100.0 259.81,50.0 173.21,100.0 86.6,50.0 -0.0,100.0 -86.6,50.0 -173.21,100.0 -173.21,200.0 -86.6,250.0 -86.6,350.0 0.0,400.0 86.6,350.0 173.21,400.0 173.21,500.0 259.81,550.0 346.41,500.0 433.01,550.0" /></svg><svg><polygon points="1818.65,-250.0 1818.65,-350.0 1732.05,-400.0 1732.05,-500.0 1818.65,-550.0 1905.26,-500.0 1991.86,-550.0 1991.86,-650.0 2078.46,-700.0 2165.06,-650.0 2165.06,-550.0 2251.67,-500.0 2251.67,-400.0 2338.27,-350.0 2338.27,-250.0 2251.67,-200.0 2165.06,-250.0 2078.46,-200.0 2078.46,-100.0 1991.86,-50.0 1991.86,50.0 1905.26,100.0 1818.65,50.0 1818.65,-50.0 1732.05,-100.0 1732.05,-200.0" /></svg><svg><polygon points="2165.06,-650.0 2165.06,-550.0 2251.67,-500.0 2251.67,-400.0 2338.27,-350.0 2338.27,-250.0 2424.87,-200.0 2424.87,-100.0 2511.47,-50.0 2598.08,-100.0 2598.08,-200.0 2684.68,-250.0 2684.68,-350.0 2771.28,-400.0 2771.28,-500.0 2684.68,-550.0 2684.68,-650.0 2598.08,-700.0 2511.47,-650.0 2424.87,-700.0 2338.27,-650.0 2251.67,-700.0" /></svg><svg><polygon points="-433.01,-650.0 -346.41,-700.0 -346.41,-800.0 -259.81,-850.0 -259.81,-950.0 -173.21,-1000.0 -173.21,-1100.0 -259.81,-1150.0 -346.41,-1100.0 -433.01,-1150.0 -519.62,-1100.0 -606.22,-1150.0 -692.82,-1100.0 -779.42,-1150.0 -779.42,-1250.0 -866.03,-1300.0 -866.03,-1400.0 -952.63,-1450.0 -1039.23,-1400.0 -1039.23,-1300.0 -1125.83,-1250.0 -1125.83,-1150.0 -1039.23,-1100.0 -1039.23,-1000.0 -1125.83,-950.0 -1125.83,-850.0 -1039.23,-800.0 -1039.23,-700.0 -952.63,-650.0 -952.63,-550.0 -866.03,-500.0 -779.42,-550.0 -692.82,-500.0 -692.82,-400.0 -606.22,-350.0 -519.62,-400.0 -519.62,-500.0 -433.01,-550.0" /></svg><svg><polygon points="779.42,-350.0 779.42,-250.0 866.03,-200.0 952.63,-250.0 1039.23,-200.0 1125.83,-250.0 1125.83,-350.0 1212.44,-400.0 1212.44,-500.0 1299.04,-550.0 1299.04,-650.0 1385.64,-700.0 1385.64,-800.0 1299.04,-850.0 1299.04,-950.0 1385.64,-1000.0 1385.64,-1100.0 1299.04,-1150.0 1299.04,-1250.0 1212.44,-1300.0 1125.83,-1250.0 1039.23,-1300.0 952.63,-1250.0 952.63,-1150.0 866.03,-1100.0 866.03,-1000.0 779.42,-950.0 779.42,-850.0 692.82,-800.0 692.82,-700.0 606.22,-650.0 606.22,-550.0 692.82,-500.0 692.82,-400.0" /></svg><svg><polygon points="-692.82,-2000.0 -692.82,-1900.0 -779.42,-1850.0 -866.03,-1900.0 -952.63,-1850.0 -1039.23,-1900.0 -1125.83,-1850.0 -1212.44,-1900.0 -1212.44,-2000.0 -1299.04,-2050.0 -1385.64,-2000.0 -1472.24,-2050.0 -1558.85,-2000.0 -1645.45,-2050.0 -1645.45,-2150.0 -1732.05,-2200.0 -1732.05,-2300.0 -1645.45,-2350.0 -1645.45,-2450.0 -1558.85,-2500.0 -1472.24,-2450.0 -1385.64,-2500.0 -1299.04,-2450.0 -1212.44,-2500.0 -1125.83,-2450.0 -1039.23,-2500.0 -952.63,-2450.0 -866.03,-2500.0 -779.42,-2450.0 -779.42,-2350.0 -692.82,-2300.0 -692.82,-2200.0 -606.22,-2150.0 -606.22,-2050.0" /></svg><svg><polygon points="952.63,-1850.0 952.63,-1750.0 1039.23,-1700.0 1039.23,-1600.0 1125.83,-1550.0 1125.83,-1450.0 1039.23,-1400.0 952.63,-1450.0 866.03,-1400.0 779.42,-1450.0 692.82,-1400.0 606.22,-1450.0 519.62,-1400.0 433.01,-1450.0 346.41,-1400.0 259.81,-1450.0 259.81,-1550.0 173.21,-1600.0 173.21,-1700.0 259.81,-1750.0 346.41,-1700.0 433.01,-1750.0 433.01,-1850.0 519.62,-1900.0 606.22,-1850.0 692.82,-1900.0 779.42,-1850.0 866.03,-1900.0" /></svg><svg><polygon points="-173.21,-2900.0 -173.21,-2800.0 -259.81,-2750.0 -259.81,-2650.0 -346.41,-2600.0 -433.01,-2650.0 -519.62,-2600.0 -606.22,-2650.0 -692.82,-2600.0 -692.82,-2500.0 -779.42,-2450.0 -779.42,-2350.0 -692.82,-2300.0 -692.82,-2200.0 -606.22,-2150.0 -606.22,-2050.0 -519.62,-2000.0 -433.01,-2050.0 -346.41,-2000.0 -259.81,-2050.0 -173.21,-2000.0 -86.6,-2050.0 -86.6,-2150.0 0.0,-2200.0 0.0,-2300.0 86.6,-2350.0 86.6,-2450.0 173.21,-2500.0 173.21,-2600.0 86.6,-2650.0 86.6,-2750.0 0.0,-2800.0 -0.0,-2900.0 -86.6,-2950.0" /></svg><svg><polygon points="1818.65,-2350.0 1905.26,-2300.0 1905.26,-2200.0 1818.65,-2150.0 1818.65,-2050.0 1732.05,-2000.0 1732.05,-1900.0 1645.45,-1850.0 1558.85,-1900.0 1472.24,-1850.0 1385.64,-1900.0 1299.04,-1850.0 1212.44,-1900.0 1125.83,-1850.0 1039.23,-1900.0 1039.23,-2000.0 952.63,-2050.0 952.63,-2150.0 866.03,-2200.0 866.03,-2300.0 952.63,-2350.0 952.63,-2450.0 1039.23,-2500.0 1039.23,-2600.0 1125.83,-2650.0 1212.44,-2600.0 1299.04,-2650.0 1385.64,-2600.0 1472.24,-2650.0 1558.85,-2600.0 1645.45,-2650.0 1732.05,-2600.0 1732.05,-2500.0 1818.65,-2450.0" /></svg><svg><polygon points="0.0,-500.0 -0.0,-400.0 86.6,-350.0 173.21,-400.0 259.81,-350.0 346.41,-400.0 433.01,-350.0 519.62,-400.0 606.22,-350.0 692.82,-400.0 692.82,-500.0 606.22,-550.0 606.22,-650.0 692.82,-700.0 692.82,-800.0 606.22,-850.0 519.62,-800.0 433.01,-850.0 346.41,-800.0 259.81,-850.0 173.21,-800.0 86.6,-850.0 86.6,-950.0 -0.0,-1000.0 -86.6,-950.0 -173.21,-1000.0 -259.81,-950.0 -259.81,-850.0 -346.41,-800.0 -346.41,-700.0 -433.01,-650.0 -433.01,-550.0 -346.41,-500.0 -259.81,-550.0 -173.21,-500.0 -86.6,-550.0" /></svg><svg><polygon points="259.81,50.0 346.41,100.0 433.01,50.0 519.62,100.0 606.22,50.0 606.22,-50.0 692.82,-100.0 692.82,-200.0 779.42,-250.0 779.42,-350.0 692.82,-400.0 606.22,-350.0 519.62,-400.0 433.01,-350.0 346.41,-400.0 259.81,-350.0 173.21,-400.0 86.6,-350.0 -0.0,-400.0 -86.6,-350.0 -86.6,-250.0 0.0,-200.0 -0.0,-100.0 -86.6,-50.0 -86.6,50.0 0.0,100.0 86.6,50.0 173.21,100.0" /></svg><svg><polygon points="-606.22,2050.0 -519.62,2000.0 -519.62,1900.0 -433.01,1850.0 -433.01,1750.0 -346.41,1700.0 -259.81,1750.0 -173.21,1700.0 -86.6,1750.0 -0.0,1700.0 86.6,1750.0 86.6,1850.0 173.21,1900.0 173.21,2000.0 259.81,2050.0 259.81,2150.0 173.21,2200.0 86.6,2150.0 0.0,2200.0 -86.6,2150.0 -173.21,2200.0 -259.81,2150.0 -346.41,2200.0 -433.01,2150.0 -519.62,2200.0 -606.22,2150.0" /></svg><svg><polygon points="519.62,2000.0 606.22,2050.0 606.22,2150.0 692.82,2200.0 692.82,2300.0 606.22,2350.0 606.22,2450.0 519.62,2500.0 433.01,2450.0 346.41,2500.0 259.81,2450.0 259.81,2350.0 173.21,2300.0 173.21,2200.0 259.81,2150.0 259.81,2050.0 346.41,2000.0 433.01,2050.0" /></svg><svg><polygon points="-0.0,1100.0 86.6,1150.0 173.21,1100.0 259.81,1150.0 259.81,1250.0 173.21,1300.0 173.21,1400.0 86.6,1450.0 86.6,1550.0 0.0,1600.0 -86.6,1550.0 -86.6,1450.0 -173.21,1400.0 -173.21,1300.0 -259.81,1250.0 -259.81,1150.0 -173.21,1100.0 -86.6,1150.0" /></svg><svg><polygon points="-2684.68,-350.0 -2684.68,-250.0 -2598.08,-200.0 -2511.47,-250.0 -2424.87,-200.0 -2424.87,-100.0 -2511.47,-50.0 -2511.47,50.0 -2598.08,100.0 -2684.68,50.0 -2771.28,100.0 -2857.88,50.0 -2944.49,100.0 -3031.09,50.0 -3031.09,-50.0 -2944.49,-100.0 -2944.49,-200.0 -2857.88,-250.0 -2857.88,-350.0 -2771.28,-400.0" /></svg><svg><polygon points="-2684.68,-650.0 -2598.08,-700.0 -2598.08,-800.0 -2511.47,-850.0 -2511.47,-950.0 -2424.87,-1000.0 -2338.27,-950.0 -2251.67,-1000.0 -2165.06,-950.0 -2165.06,-850.0 -2251.67,-800.0 -2251.67,-700.0 -2338.27,-650.0 -2338.27,-550.0 -2424.87,-500.0 -2424.87,-400.0 -2338.27,-350.0 -2338.27,-250.0 -2424.87,-200.0 -2511.47,-250.0 -2598.08,-200.0 -2684.68,-250.0 -2684.68,-350.0 -2771.28,-400.0 -2857.88,-350.0 -2944.49,-400.0 -2944.49,-500.0 -2857.88,-550.0 -2857.88,-650.0 -2771.28,-700.0" /></svg><svg><polygon points="-0.0,-500.0 0.0,-400.0 -86.6,-350.0 -86.6,-250.0 -0.0,-200.0 0.0,-100.0 -86.6,-50.0 -86.6,50.0 -173.21,100.0 -259.81,50.0 -259.81,-50.0 -346.41,-100.0 -433.01,-50.0 -519.62,-100.0 -606.22,-50.0 -692.82,-100.0 -692.82,-200.0 -779.42,-250.0 -779.42,-350.0 -692.82,-400.0 -606.22,-350.0 -519.62,-400.0 -519.62,-500.0 -433.01,-550.0 -346.41,-500.0 -259.81,-550.0 -173.21,-500.0 -86.6,-550.0" /></svg><svg><polygon points="2857.88,250.0 2771.28,200.0 2684.68,250.0 2598.08,200.0 2598.08,100.0 2511.47,50.0 2511.47,-50.0 2598.08,-100.0 2598.08,-200.0 2684.68,-250.0 2684.68,-350.0 2771.28,-400.0 2857.88,-350.0 2857.88,-250.0 2944.49,-200.0 2944.49,-100.0 3031.09,-50.0 3031.09,50.0 2944.49,100.0 2944.49,200.0" /></svg><svg><polygon points="2424.87,-700.0 2338.27,-650.0 2251.67,-700.0 2165.06,-650.0 2078.46,-700.0 2078.46,-800.0 1991.86,-850.0 1991.86,-950.0 2078.46,-1000.0 2165.06,-950.0 2251.67,-1000.0 2338.27,-950.0 2424.87,-1000.0 2511.47,-950.0 2511.47,-850.0 2598.08,-800.0 2598.08,-700.0 2511.47,-650.0" /></svg><svg><polygon points="952.63,-2150.0 866.03,-2200.0 866.03,-2300.0 779.42,-2350.0 692.82,-2300.0 606.22,-2350.0 519.62,-2300.0 433.01,-2350.0 433.01,-2450.0 346.41,-2500.0 259.81,-2450.0 173.21,-2500.0 86.6,-2450.0 86.6,-2350.0 0.0,-2300.0 -0.0,-2200.0 -86.6,-2150.0 -86.6,-2050.0 0.0,-2000.0 -0.0,-1900.0 86.6,-1850.0 86.6,-1750.0 173.21,-1700.0 259.81,-1750.0 346.41,-1700.0 433.01,-1750.0 433.01,-1850.0 519.62,-1900.0 606.22,-1850.0 692.82,-1900.0 779.42,-1850.0 866.03,-1900.0 952.63,-1850.0 1039.23,-1900.0 1039.23,-2000.0 952.63,-2050.0" /></svg><svg><polygon points="-2424.87,1300.0 -2511.47,1250.0 -2511.47,1150.0 -2598.08,1100.0 -2684.68,1150.0 -2684.68,1250.0 -2771.28,1300.0 -2771.28,1400.0 -2857.88,1450.0 -2857.88,1550.0 -2771.28,1600.0 -2684.68,1550.0 -2598.08,1600.0 -2511.47,1550.0 -2424.87,1600.0 -2338.27,1550.0 -2251.67,1600.0 -2165.06,1550.0 -2165.06,1450.0 -2251.67,1400.0 -2251.67,1300.0 -2338.27,1250.0" /></svg><svg><polygon points="-2424.87,1000.0 -2511.47,950.0 -2598.08,1000.0 -2598.08,1100.0 -2511.47,1150.0 -2511.47,1250.0 -2424.87,1300.0 -2338.27,1250.0 -2251.67,1300.0 -2165.06,1250.0 -2165.06,1150.0 -2251.67,1100.0 -2251.67,1000.0 -2338.27,950.0" /></svg><svg><polygon points="-2078.46,700.0 -2165.06,650.0 -2165.06,550.0 -2078.46,500.0 -1991.86,550.0 -1905.26,500.0 -1818.65,550.0 -1732.05,500.0 -1645.45,550.0 -1558.85,500.0 -1472.24,550.0 -1472.24,650.0 -1385.64,700.0 -1385.64,800.0 -1472.24,850.0 -1472.24,950.0 -1558.85,1000.0 -1558.85,1100.0 -1645.45,1150.0 -1732.05,1100.0 -1732.05,1000.0 -1818.65,950.0 -1818.65,850.0 -1905.26,800.0 -1991.86,850.0 -2078.46,800.0" /></svg><svg><polygon points="-2684.68,950.0 -2684.68,850.0 -2771.28,800.0 -2771.28,700.0 -2684.68,650.0 -2684.68,550.0 -2598.08,500.0 -2511.47,550.0 -2424.87,500.0 -2338.27,550.0 -2251.67,500.0 -2165.06,550.0 -2165.06,650.0 -2078.46,700.0 -2078.46,800.0 -2165.06,850.0 -2165.06,950.0 -2251.67,1000.0 -2338.27,950.0 -2424.87,1000.0 -2511.47,950.0 -2598.08,1000.0" /></svg><svg><polygon points="-433.01,1550.0 -346.41,1600.0 -346.41,1700.0 -433.01,1750.0 -433.01,1850.0 -519.62,1900.0 -606.22,1850.0 -606.22,1750.0 -692.82,1700.0 -692.82,1600.0 -779.42,1550.0 -779.42,1450.0 -866.03,1400.0 -866.03,1300.0 -779.42,1250.0 -779.42,1150.0 -692.82,1100.0 -606.22,1150.0 -606.22,1250.0 -519.62,1300.0 -519.62,1400.0 -433.01,1450.0" /></svg><svg><polygon points="-259.81,1250.0 -173.21,1300.0 -173.21,1400.0 -86.6,1450.0 -86.6,1550.0 -0.0,1600.0 0.0,1700.0 -86.6,1750.0 -173.21,1700.0 -259.81,1750.0 -346.41,1700.0 -346.41,1600.0 -433.01,1550.0 -433.01,1450.0 -346.41,1400.0 -346.41,1300.0" /></svg><svg><polygon points="-519.62,800.0 -433.01,850.0 -346.41,800.0 -259.81,850.0 -173.21,800.0 -86.6,850.0 -86.6,950.0 -0.0,1000.0 0.0,1100.0 -86.6,1150.0 -173.21,1100.0 -259.81,1150.0 -346.41,1100.0 -433.01,1150.0 -519.62,1100.0 -606.22,1150.0 -692.82,1100.0 -692.82,1000.0 -606.22,950.0 -606.22,850.0" /></svg><svg><polygon points="-1472.24,650.0 -1472.24,550.0 -1558.85,500.0 -1645.45,550.0 -1732.05,500.0 -1732.05,400.0 -1818.65,350.0 -1818.65,250.0 -1905.26,200.0 -1905.26,100.0 -1818.65,50.0 -1732.05,100.0 -1645.45,50.0 -1558.85,100.0 -1472.24,50.0 -1385.64,100.0 -1299.04,50.0 -1212.44,100.0 -1212.44,200.0 -1299.04,250.0 -1299.04,350.0 -1212.44,400.0 -1212.44,500.0 -1299.04,550.0 -1299.04,650.0 -1385.64,700.0" /></svg><svg><polygon points="-1385.64,-700.0 -1299.04,-650.0 -1212.44,-700.0 -1212.44,-800.0 -1125.83,-850.0 -1039.23,-800.0 -1039.23,-700.0 -952.63,-650.0 -952.63,-550.0 -866.03,-500.0 -779.42,-550.0 -692.82,-500.0 -692.82,-400.0 -779.42,-350.0 -779.42,-250.0 -692.82,-200.0 -692.82,-100.0 -779.42,-50.0 -866.03,-100.0 -952.63,-50.0 -1039.23,-100.0 -1125.83,-50.0 -1212.44,-100.0 -1299.04,-50.0 -1385.64,-100.0 -1385.64,-200.0 -1472.24,-250.0 -1472.24,-350.0 -1558.85,-400.0 -1558.85,-500.0 -1472.24,-550.0 -1472.24,-650.0" /></svg><svg><polygon points="779.42,1850.0 866.03,1900.0 866.03,2000.0 779.42,2050.0 692.82,2000.0 606.22,2050.0 519.62,2000.0 519.62,1900.0 606.22,1850.0 606.22,1750.0 519.62,1700.0 519.62,1600.0 606.22,1550.0 606.22,1450.0 692.82,1400.0 779.42,1450.0 779.42,1550.0 866.03,1600.0 866.03,1700.0 779.42,1750.0" /></svg><svg><polygon points="1212.44,2200.0 1212.44,2300.0 1125.83,2350.0 1125.83,2450.0 1039.23,2500.0 952.63,2450.0 866.03,2500.0 779.42,2450.0 692.82,2500.0 606.22,2450.0 606.22,2350.0 692.82,2300.0 692.82,2200.0 606.22,2150.0 606.22,2050.0 692.82,2000.0 779.42,2050.0 866.03,2000.0 952.63,2050.0 952.63,2150.0 1039.23,2200.0 1125.83,2150.0" /></svg><svg><polygon points="1385.64,1600.0 1299.04,1550.0 1212.44,1600.0 1212.44,1700.0 1299.04,1750.0 1299.04,1850.0 1212.44,1900.0 1212.44,2000.0 1125.83,2050.0 1125.83,2150.0 1212.44,2200.0 1299.04,2150.0 1385.64,2200.0 1472.24,2150.0 1472.24,2050.0 1558.85,2000.0 1645.45,2050.0 1732.05,2000.0 1732.05,1900.0 1645.45,1850.0 1645.45,1750.0 1558.85,1700.0 1558.85,1600.0 1472.24,1550.0" /></svg><svg><polygon points="1039.23,200.0 1125.83,250.0 1125.83,350.0 1212.44,400.0 1299.04,350.0 1385.64,400.0 1472.24,350.0 1558.85,400.0 1558.85,500.0 1472.24,550.0 1472.24,650.0 1385.64,700.0 1299.04,650.0 1212.44,700.0 1125.83,650.0 1039.23,700.0 952.63,650.0 952.63,550.0 866.03,500.0 779.42,550.0 692.82,500.0 692.82,400.0 606.22,350.0 606.22,250.0 692.82,200.0 779.42,250.0 866.03,200.0 952.63,250.0" /></svg><svg><polygon points="1732.05,-200.0 1732.05,-100.0 1818.65,-50.0 1818.65,50.0 1732.05,100.0 1645.45,50.0 1558.85,100.0 1472.24,50.0 1472.24,-50.0 1385.64,-100.0 1385.64,-200.0 1299.04,-250.0 1212.44,-200.0 1125.83,-250.0 1125.83,-350.0 1212.44,-400.0 1212.44,-500.0 1299.04,-550.0 1385.64,-500.0 1472.24,-550.0 1558.85,-500.0 1645.45,-550.0 1732.05,-500.0 1732.05,-400.0 1818.65,-350.0 1818.65,-250.0" /></svg><svg><polygon points="2511.47,850.0 2598.08,800.0 2598.08,700.0 2684.68,650.0 2684.68,550.0 2598.08,500.0 2598.08,400.0 2511.47,350.0 2424.87,400.0 2338.27,350.0 2251.67,400.0 2165.06,350.0 2078.46,400.0 1991.86,350.0 1905.26,400.0 1905.26,500.0 1991.86,550.0 1991.86,650.0 2078.46,700.0 2165.06,650.0 2251.67,700.0 2251.67,800.0 2338.27,850.0 2424.87,800.0" /></svg><svg><polygon points="2771.28,200.0 2857.88,250.0 2944.49,200.0 3031.09,250.0 3031.09,350.0 2944.49,400.0 2944.49,500.0 2857.88,550.0 2857.88,650.0 2771.28,700.0 2684.68,650.0 2684.68,550.0 2598.08,500.0 2598.08,400.0 2511.47,350.0 2511.47,250.0 2598.08,200.0 2684.68,250.0" /></svg><svg><polygon points="1818.65,350.0 1905.26,400.0 1991.86,350.0 2078.46,400.0 2165.06,350.0 2165.06,250.0 2251.67,200.0 2251.67,100.0 2338.27,50.0 2424.87,100.0 2511.47,50.0 2511.47,-50.0 2424.87,-100.0 2424.87,-200.0 2338.27,-250.0 2251.67,-200.0 2165.06,-250.0 2078.46,-200.0 2078.46,-100.0 1991.86,-50.0 1991.86,50.0 1905.26,100.0 1905.26,200.0 1818.65,250.0" /></svg><svg><polygon points="-2511.47,-1250.0 -2424.87,-1300.0 -2424.87,-1400.0 -2511.47,-1450.0 -2511.47,-1550.0 -2598.08,-1600.0 -2598.08,-1700.0 -2511.47,-1750.0 -2511.47,-1850.0 -2424.87,-1900.0 -2424.87,-2000.0 -2338.27,-2050.0 -2251.67,-2000.0 -2165.06,-2050.0 -2078.46,-2000.0 -2078.46,-1900.0 -2165.06,-1850.0 -2165.06,-1750.0 -2078.46,-1700.0 -2078.46,-1600.0 -1991.86,-1550.0 -1991.86,-1450.0 -2078.46,-1400.0 -2078.46,-1300.0 -1991.86,-1250.0 -1991.86,-1150.0 -2078.46,-1100.0 -2078.46,-1000.0 -2165.06,-950.0 -2251.67,-1000.0 -2338.27,-950.0 -2424.87,-1000.0 -2424.87,-1100.0 -2511.47,-1150.0" /></svg><svg><polygon points="-1991.86,-1150.0 -1991.86,-1250.0 -2078.46,-1300.0 -2078.46,-1400.0 -1991.86,-1450.0 -1991.86,-1550.0 -1905.26,-1600.0 -1818.65,-1550.0 -1732.05,-1600.0 -1645.45,-1550.0 -1645.45,-1450.0 -1558.85,-1400.0 -1558.85,-1300.0 -1645.45,-1250.0 -1732.05,-1300.0 -1818.65,-1250.0 -1818.65,-1150.0 -1905.26,-1100.0" /></svg><svg><polygon points="-1039.23,-1900.0 -952.63,-1850.0 -952.63,-1750.0 -1039.23,-1700.0 -1039.23,-1600.0 -1125.83,-1550.0 -1125.83,-1450.0 -1212.44,-1400.0 -1299.04,-1450.0 -1385.64,-1400.0 -1472.24,-1450.0 -1558.85,-1400.0 -1645.45,-1450.0 -1645.45,-1550.0 -1558.85,-1600.0 -1558.85,-1700.0 -1645.45,-1750.0 -1645.45,-1850.0 -1732.05,-1900.0 -1732.05,-2000.0 -1645.45,-2050.0 -1558.85,-2000.0 -1472.24,-2050.0 -1385.64,-2000.0 -1299.04,-2050.0 -1212.44,-2000.0 -1212.44,-1900.0 -1125.83,-1850.0" /></svg><svg><polygon points="-779.42,-1150.0 -779.42,-1250.0 -866.03,-1300.0 -866.03,-1400.0 -952.63,-1450.0 -1039.23,-1400.0 -1125.83,-1450.0 -1125.83,-1550.0 -1039.23,-1600.0 -1039.23,-1700.0 -952.63,-1750.0 -952.63,-1850.0 -866.03,-1900.0 -779.42,-1850.0 -779.42,-1750.0 -692.82,-1700.0 -692.82,-1600.0 -606.22,-1550.0 -606.22,-1450.0 -519.62,-1400.0 -433.01,-1450.0 -346.41,-1400.0 -346.41,-1300.0 -259.81,-1250.0 -259.81,-1150.0 -346.41,-1100.0 -433.01,-1150.0 -519.62,-1100.0 -606.22,-1150.0 -692.82,-1100.0" /></svg><svg><polygon points="-259.81,-1150.0 -259.81,-1250.0 -346.41,-1300.0 -346.41,-1400.0 -259.81,-1450.0 -259.81,-1550.0 -173.21,-1600.0 -173.21,-1700.0 -86.6,-1750.0 -86.6,-1850.0 -0.0,-1900.0 86.6,-1850.0 86.6,-1750.0 173.21,-1700.0 173.21,-1600.0 86.6,-1550.0 86.6,-1450.0 173.21,-1400.0 173.21,-1300.0 86.6,-1250.0 86.6,-1150.0 0.0,-1100.0 0.0,-1000.0 -86.6,-950.0 -173.21,-1000.0 -173.21,-1100.0" /></svg><svg><polygon points="1991.86,-1150.0 1991.86,-1250.0 1905.26,-1300.0 1905.26,-1400.0 1818.65,-1450.0 1818.65,-1550.0 1732.05,-1600.0 1645.45,-1550.0 1645.45,-1450.0 1558.85,-1400.0 1558.85,-1300.0 1472.24,-1250.0 1385.64,-1300.0 1299.04,-1250.0 1299.04,-1150.0 1385.64,-1100.0 1385.64,-1000.0 1472.24,-950.0 1558.85,-1000.0 1645.45,-950.0 1732.05,-1000.0 1818.65,-950.0 1905.26,-1000.0 1905.26,-1100.0" /></svg><svg><polygon points="1991.86,-1250.0 1991.86,-1150.0 1905.26,-1100.0 1905.26,-1000.0 1991.86,-950.0 2078.46,-1000.0 2165.06,-950.0 2251.67,-1000.0 2338.27,-950.0 2424.87,-1000.0 2424.87,-1100.0 2511.47,-1150.0 2511.47,-1250.0 2424.87,-1300.0 2424.87,-1400.0 2338.27,-1450.0 2251.67,-1400.0 2251.67,-1300.0 2165.06,-1250.0 2078.46,-1300.0" /></svg><svg><polygon points="1645.45,-1850.0 1732.05,-1900.0 1732.05,-2000.0 1818.65,-2050.0 1818.65,-2150.0 1905.26,-2200.0 1991.86,-2150.0 1991.86,-2050.0 2078.46,-2000.0 2165.06,-2050.0 2251.67,-2000.0 2251.67,-1900.0 2338.27,-1850.0 2338.27,-1750.0 2251.67,-1700.0 2251.67,-1600.0 2338.27,-1550.0 2338.27,-1450.0 2251.67,-1400.0 2165.06,-1450.0 2165.06,-1550.0 2078.46,-1600.0 1991.86,-1550.0 1905.26,-1600.0 1818.65,-1550.0 1732.05,-1600.0 1732.05,-1700.0 1645.45,-1750.0" /></svg><svg><polygon points="-2338.27,-550.0 -2424.87,-500.0 -2424.87,-400.0 -2338.27,-350.0 -2338.27,-250.0 -2251.67,-200.0 -2165.06,-250.0 -2078.46,-200.0 -1991.86,-250.0 -1905.26,-200.0 -1818.65,-250.0 -1818.65,-350.0 -1732.05,-400.0 -1732.05,-500.0 -1818.65,-550.0 -1818.65,-650.0 -1905.26,-700.0 -1905.26,-800.0 -1991.86,-850.0 -1991.86,-950.0 -2078.46,-1000.0 -2165.06,-950.0 -2165.06,-850.0 -2251.67,-800.0 -2251.67,-700.0 -2338.27,-650.0" /></svg>';


// Lazy event listener association
window.addEventListener('load', function (): void {
    let map = <HTMLDivElement>document.getElementById('map');
    map.addEventListener('mousedown', panMap);
    map.addEventListener('wheel', zoomMap);

    // Hook up map layer controls
    let textureBtn = <HTMLInputElement>document.getElementById('showMapTexture');
    let textureLayer = <HTMLDivElement>document.getElementById('mapTextureLayer');
    textureBtn.addEventListener('click', toggleMapLayer(textureBtn, textureLayer));
    let hexesBtn = <HTMLInputElement>document.getElementById('showHexes');
    let hexesLayer = <HTMLDivElement>document.getElementById('mapHexLayer');
    hexesBtn.addEventListener('click', toggleMapLayer(hexesBtn, hexesLayer));

    // Load individual base SVGs
    hexesLayer.innerHTML = svg_strings;
});


// Map pan controls
function panMap(this: HTMLDivElement, pushEvent: MouseEvent): void {
    let map = <HTMLDivElement>document.getElementById('map');
    let initialOffsetLeft = this.offsetLeft;
    let initialOffsetTop = this.offsetTop;
    const sizeX = this.clientWidth;
    const sizeY = this.clientHeight;

    function mapMover(this: HTMLDivElement, moveEvent: MouseEvent): void {
        let deltaX = moveEvent.clientX - pushEvent.clientX;
        let deltaY = moveEvent.clientY - pushEvent.clientY;
        let newLeft = initialOffsetLeft + deltaX;
        let newTop = initialOffsetTop + deltaY;
        // Constraint motion so half of the map is still in frame
        if (-sizeX < newLeft && newLeft < 0) {
            this.style.left = `${newLeft}px`;
        }
        if (-sizeY < newTop && newTop < 0) {
            this.style.top = `${newTop}px`;
        }
    }
    map.addEventListener('mousemove', mapMover);

    // This ensures mouseup works throughout the entire document
    document.addEventListener('mouseup', function (): void {
        map.removeEventListener('mousemove', mapMover);
    });
}

let zoomLevel = 1.0;

// Map zoom controls
function zoomMap(this: HTMLDivElement, wheelEvent: WheelEvent): void {
    wheelEvent.preventDefault()
    zoomLevel = wheelEvent.deltaY < 0 ? zoomLevel * 1.2 : zoomLevel * 0.8;
    // Limit zoom level
    if (zoomLevel < 0.1) {
        zoomLevel = 0.1;
    }
    else if (zoomLevel > 2.0) {
        zoomLevel = 2.0;
    }
    // Resize map
    this.style.transform = `scale(${zoomLevel})`;
}