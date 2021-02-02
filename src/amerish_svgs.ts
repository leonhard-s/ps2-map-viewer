// Horrible, hard-coded string SVGs
// These will be retrieved via the API at a later stage.
const svg_strings = '<svg><polygon id="Base_6001" points="1795.4,804.25 1695.38,746.5 1595.35,804.25 1595.35,919.75 1495.33,977.5 1495.33,1093.0 1395.3,1150.75 1395.3,1266.25 1295.27,1324.0 1295.27,1439.5 1395.3,1497.25 1395.3,1612.75 1495.33,1670.5 1595.35,1612.75 1695.38,1670.5 1795.4,1612.75 1895.43,1670.5 1995.46,1612.75 2095.48,1670.5 2195.51,1612.75 2295.53,1670.5 2395.56,1612.75 2395.56,1497.25 2495.59,1439.5 2495.59,1324.0 2595.61,1266.25 2595.61,1150.75 2695.64,1093.0 2695.64,977.5 2595.61,919.75 2495.59,977.5 2395.56,919.75 2395.56,804.25 2295.53,746.5 2195.51,804.25 2095.48,746.5 1995.46,804.25 1895.43,746.5" /><polygon id="Base_6002" points="7496.88,1439.5 7596.91,1497.25 7596.91,1612.75 7496.88,1670.5 7496.88,1786.0 7396.86,1843.75 7396.86,1959.25 7496.88,2017.0 7496.88,2132.5 7396.86,2190.25 7296.83,2132.5 7196.8,2190.25 7096.78,2132.5 6996.75,2190.25 6896.73,2132.5 6796.7,2190.25 6696.67,2132.5 6696.67,2017.0 6596.65,1959.25 6596.65,1843.75 6496.62,1786.0 6496.62,1670.5 6596.65,1612.75 6596.65,1497.25 6696.67,1439.5 6696.67,1324.0 6796.7,1266.25 6796.7,1150.75 6896.73,1093.0 6996.75,1150.75 7096.78,1093.0 7196.8,1150.75 7296.83,1093.0 7396.86,1150.75 7396.86,1266.25 7496.88,1324.0" /><polygon id="Base_6003" points="5296.31,6868.0 5196.29,6810.25 5196.29,6694.75 5096.26,6637.0 4996.23,6694.75 4896.21,6637.0 4796.18,6694.75 4696.16,6637.0 4596.13,6694.75 4596.13,6810.25 4496.1,6868.0 4396.08,6810.25 4296.05,6868.0 4296.05,6983.5 4196.03,7041.25 4196.03,7156.75 4096.0,7214.5 4096.0,7330.0 4196.03,7387.75 4296.05,7330.0 4396.08,7387.75 4496.1,7330.0 4596.13,7387.75 4696.16,7330.0 4796.18,7387.75 4896.21,7330.0 4996.23,7387.75 5096.26,7330.0 5096.26,7214.5 5196.29,7156.75 5296.31,7214.5 5396.34,7156.75 5396.34,7041.25 5296.31,6983.5" /><polygon id="Base_6101" points="1995.46,2998.75 1995.46,2883.25 2095.48,2825.5 2095.48,2710.0 2195.51,2652.25 2195.51,2536.75 2095.48,2479.0 2095.48,2363.5 1995.46,2305.75 1895.43,2363.5 1795.4,2305.75 1795.4,2190.25 1695.38,2132.5 1595.35,2190.25 1595.35,2305.75 1495.33,2363.5 1495.33,2479.0 1595.35,2536.75 1595.35,2652.25 1495.33,2710.0 1495.33,2825.5 1595.35,2883.25 1595.35,2998.75 1695.38,3056.5 1795.4,2998.75 1895.43,3056.5" /><polygon id="Base_6102" points="3595.87,2652.25 3495.84,2710.0 3395.82,2652.25 3395.82,2536.75 3495.84,2479.0 3495.84,2363.5 3595.87,2305.75 3695.9,2363.5 3695.9,2479.0 3795.92,2536.75 3795.92,2652.25 3695.9,2710.0" /><polygon id="Base_6103" points="1895.43,4096.0 1795.4,4038.25 1795.4,3922.75 1895.43,3865.0 1995.46,3922.75 2095.48,3865.0 2195.51,3922.75 2295.53,3865.0 2395.56,3922.75 2495.59,3865.0 2595.61,3922.75 2595.61,4038.25 2495.59,4096.0 2495.59,4211.5 2395.56,4269.25 2395.56,4384.75 2295.53,4442.5 2295.53,4558.0 2195.51,4615.75 2095.48,4558.0 2095.48,4442.5 1995.46,4384.75 1995.46,4269.25 1895.43,4211.5" /><polygon id="Base_6111" points="4996.23,1959.25 4996.23,1843.75 5096.26,1786.0 5096.26,1670.5 5196.29,1612.75 5196.29,1497.25 5296.31,1439.5 5396.34,1497.25 5396.34,1612.75 5496.36,1670.5 5496.36,1786.0 5596.39,1843.75 5596.39,1959.25 5496.36,2017.0 5496.36,2132.5 5596.39,2190.25 5596.39,2305.75 5496.36,2363.5 5396.34,2305.75 5296.31,2363.5 5196.29,2305.75 5096.26,2363.5 4996.23,2305.75 4996.23,2190.25 5096.26,2132.5 5096.26,2017.0" /><polygon id="Base_6112" points="5696.41,3518.5 5596.39,3576.25 5496.36,3518.5 5396.34,3576.25 5396.34,3691.75 5296.31,3749.5 5196.29,3691.75 5096.26,3749.5 4996.23,3691.75 4896.21,3749.5 4896.21,3865.0 4796.18,3922.75 4796.18,4038.25 4896.21,4096.0 4896.21,4211.5 4996.23,4269.25 5096.26,4211.5 5196.29,4269.25 5296.31,4211.5 5396.34,4269.25 5496.36,4211.5 5596.39,4269.25 5696.41,4211.5 5696.41,4096.0 5796.44,4038.25 5796.44,3922.75 5896.47,3865.0 5996.49,3922.75 6096.52,3865.0 6196.54,3922.75 6296.57,3865.0 6296.57,3749.5 6196.54,3691.75 6196.54,3576.25 6096.52,3518.5 6096.52,3403.0 5996.49,3345.25 5896.47,3403.0 5896.47,3518.5 5796.44,3576.25" /><polygon id="Base_6113" points="6796.7,3922.75 6896.73,3865.0 6996.75,3922.75 7096.78,3865.0 7096.78,3749.5 6996.75,3691.75 6996.75,3576.25 6896.73,3518.5 6796.7,3576.25 6696.67,3518.5 6596.65,3576.25 6596.65,3691.75 6696.67,3749.5 6696.67,3865.0" /><polygon id="Base_6121" points="2095.48,5828.5 1995.46,5770.75 1895.43,5828.5 1795.4,5770.75 1695.38,5828.5 1695.38,5944.0 1595.35,6001.75 1595.35,6117.25 1695.38,6175.0 1695.38,6290.5 1595.35,6348.25 1595.35,6463.75 1695.38,6521.5 1795.4,6463.75 1895.43,6521.5 1895.43,6637.0 1995.46,6694.75 2095.48,6637.0 2095.48,6521.5 2195.51,6463.75 2195.51,6348.25 2095.48,6290.5 2095.48,6175.0 2195.51,6117.25 2195.51,6001.75 2295.53,5944.0 2295.53,5828.5 2195.51,5770.75" /><polygon id="Base_6122" points="3395.82,5770.75 3395.82,5655.25 3495.84,5597.5 3595.87,5655.25 3695.9,5597.5 3795.92,5655.25 3795.92,5770.75 3895.95,5828.5 3895.95,5944.0 3995.97,6001.75 3995.97,6117.25 4096.0,6175.0 4096.0,6290.5 3995.97,6348.25 3895.95,6290.5 3795.92,6348.25 3695.9,6290.5 3595.87,6348.25 3495.84,6290.5 3395.82,6348.25 3295.79,6290.5 3295.79,6175.0 3195.77,6117.25 3195.77,6001.75 3295.79,5944.0 3295.79,5828.5" /><polygon id="Base_6123" points="6596.65,5424.25 6696.67,5482.0 6696.67,5597.5 6596.65,5655.25 6596.65,5770.75 6496.62,5828.5 6396.6,5770.75 6296.57,5828.5 6196.54,5770.75 6196.54,5655.25 6296.57,5597.5 6296.57,5482.0 6396.6,5424.25 6496.62,5482.0" /><polygon id="Base_6201" points="2695.64,2017.0 2595.61,1959.25 2595.61,1843.75 2695.64,1786.0 2695.64,1670.5 2795.66,1612.75 2895.69,1670.5 2995.71,1612.75 3095.74,1670.5 3195.77,1612.75 3295.79,1670.5 3395.82,1612.75 3495.84,1670.5 3495.84,1786.0 3395.82,1843.75 3395.82,1959.25 3295.79,2017.0 3295.79,2132.5 3195.77,2190.25 3195.77,2305.75 3095.74,2363.5 2995.71,2305.75 2895.69,2363.5 2795.66,2305.75 2795.66,2190.25 2695.64,2132.5" /><polygon id="Base_6202" points="4096.0,2017.0 4196.03,1959.25 4196.03,1843.75 4296.05,1786.0 4296.05,1670.5 4396.08,1612.75 4496.1,1670.5 4596.13,1612.75 4696.16,1670.5 4696.16,1786.0 4796.18,1843.75 4796.18,1959.25 4696.16,2017.0 4696.16,2132.5 4796.18,2190.25 4796.18,2305.75 4896.21,2363.5 4896.21,2479.0 4796.18,2536.75 4696.16,2479.0 4596.13,2536.75 4496.1,2479.0 4396.08,2536.75 4296.05,2479.0 4296.05,2363.5 4196.03,2305.75 4196.03,2190.25 4096.0,2132.5" /><polygon id="Base_6203" points="7396.86,2652.25 7296.83,2710.0 7296.83,2825.5 7396.86,2883.25 7396.86,2998.75 7296.83,3056.5 7296.83,3172.0 7196.8,3229.75 7096.78,3172.0 7096.78,3056.5 6996.75,2998.75 6896.73,3056.5 6796.7,2998.75 6696.67,3056.5 6596.65,2998.75 6596.65,2883.25 6696.67,2825.5 6696.67,2710.0 6796.7,2652.25 6796.7,2536.75 6896.73,2479.0 6896.73,2363.5 6996.75,2305.75 6996.75,2190.25 7096.78,2132.5 7196.8,2190.25 7296.83,2132.5 7396.86,2190.25 7496.88,2132.5 7596.91,2190.25 7596.91,2305.75 7496.88,2363.5 7496.88,2479.0 7396.86,2536.75" /><polygon id="Base_6204" points="5296.31,3056.5 5296.31,3172.0 5196.29,3229.75 5196.29,3345.25 5096.26,3403.0 4996.23,3345.25 4896.21,3403.0 4896.21,3518.5 4796.18,3576.25 4696.16,3518.5 4696.16,3403.0 4596.13,3345.25 4496.1,3403.0 4396.08,3345.25 4396.08,3229.75 4496.1,3172.0 4496.1,3056.5 4596.13,2998.75 4596.13,2883.25 4696.16,2825.5 4696.16,2710.0 4796.18,2652.25 4796.18,2536.75 4896.21,2479.0 4996.23,2536.75 4996.23,2652.25 5096.26,2710.0 5096.26,2825.5 5196.29,2883.25 5196.29,2998.75" /><polygon id="Base_6205" points="3995.97,3576.25 4096.0,3518.5 4096.0,3403.0 3995.97,3345.25 3995.97,3229.75 3895.95,3172.0 3895.95,3056.5 3795.92,2998.75 3695.9,3056.5 3595.87,2998.75 3495.84,3056.5 3395.82,2998.75 3295.79,3056.5 3295.79,3172.0 3195.77,3229.75 3195.77,3345.25 3095.74,3403.0 3095.74,3518.5 3195.77,3576.25 3195.77,3691.75 3295.79,3749.5 3295.79,3865.0 3195.77,3922.75 3195.77,4038.25 3295.79,4096.0 3395.82,4038.25 3495.84,4096.0 3595.87,4038.25 3695.9,4096.0 3795.92,4038.25 3795.92,3922.75 3895.95,3865.0 3895.95,3749.5 3995.97,3691.75" /><polygon id="Base_6206" points="4296.05,5482.0 4196.03,5424.25 4196.03,5308.75 4096.0,5251.0 4096.0,5135.5 4196.03,5077.75 4196.03,4962.25 4296.05,4904.5 4396.08,4962.25 4496.1,4904.5 4596.13,4962.25 4696.16,4904.5 4796.18,4962.25 4896.21,4904.5 4996.23,4962.25 4996.23,5077.75 5096.26,5135.5 5096.26,5251.0 5196.29,5308.75 5196.29,5424.25 5296.31,5482.0 5296.31,5597.5 5196.29,5655.25 5096.26,5597.5 4996.23,5655.25 4896.21,5597.5 4796.18,5655.25 4696.16,5597.5 4596.13,5655.25 4496.1,5597.5 4396.08,5655.25 4396.08,5770.75 4296.05,5828.5 4196.03,5770.75 4196.03,5655.25 4296.05,5597.5" /><polygon id="Base_6207" points="5596.39,4615.75 5696.41,4558.0 5796.44,4615.75 5896.47,4558.0 5996.49,4615.75 6096.52,4558.0 6196.54,4615.75 6296.57,4558.0 6396.6,4615.75 6396.6,4731.25 6496.62,4789.0 6496.62,4904.5 6396.6,4962.25 6396.6,5077.75 6296.57,5135.5 6196.54,5077.75 6096.52,5135.5 5996.49,5077.75 5896.47,5135.5 5796.44,5077.75 5696.41,5135.5 5596.39,5077.75 5596.39,4962.25 5696.41,4904.5 5696.41,4789.0 5596.39,4731.25" /><polygon id="Base_6208" points="1995.46,4615.75 1995.46,4731.25 1895.43,4789.0 1895.43,4904.5 1795.4,4962.25 1795.4,5077.75 1695.38,5135.5 1695.38,5251.0 1795.4,5308.75 1895.43,5251.0 1995.46,5308.75 1995.46,5424.25 2095.48,5482.0 2195.51,5424.25 2295.53,5482.0 2295.53,5597.5 2395.56,5655.25 2495.59,5597.5 2595.61,5655.25 2695.64,5597.5 2795.66,5655.25 2895.69,5597.5 2895.69,5482.0 2795.66,5424.25 2795.66,5308.75 2895.69,5251.0 2895.69,5135.5 2795.66,5077.75 2795.66,4962.25 2695.64,4904.5 2695.64,4789.0 2595.61,4731.25 2495.59,4789.0 2395.56,4731.25 2395.56,4615.75 2295.53,4558.0 2195.51,4615.75 2095.48,4558.0" /><polygon id="Base_6209" points="5296.31,5828.5 5296.31,5944.0 5196.29,6001.75 5196.29,6117.25 5296.31,6175.0 5396.34,6117.25 5496.36,6175.0 5596.39,6117.25 5696.41,6175.0 5796.44,6117.25 5896.47,6175.0 5996.49,6117.25 5996.49,6001.75 6096.52,5944.0 6096.52,5828.5 5996.49,5770.75 5996.49,5655.25 5896.47,5597.5 5896.47,5482.0 5796.44,5424.25 5696.41,5482.0 5596.39,5424.25 5496.36,5482.0 5396.34,5424.25 5296.31,5482.0 5296.31,5597.5 5396.34,5655.25 5396.34,5770.75" /><polygon id="Base_6301" points="2395.56,1497.25 2495.59,1439.5 2495.59,1324.0 2595.61,1266.25 2595.61,1150.75 2695.64,1093.0 2695.64,977.5 2795.66,919.75 2895.69,977.5 2995.71,919.75 3095.74,977.5 3095.74,1093.0 3195.77,1150.75 3295.79,1093.0 3395.82,1150.75 3395.82,1266.25 3495.84,1324.0 3495.84,1439.5 3395.82,1497.25 3395.82,1612.75 3295.79,1670.5 3195.77,1612.75 3095.74,1670.5 2995.71,1612.75 2895.69,1670.5 2795.66,1612.75 2695.64,1670.5 2695.64,1786.0 2595.61,1843.75 2495.59,1786.0 2495.59,1670.5 2395.56,1612.75" /><polygon id="Base_6302" points="4196.03,1497.25 4296.05,1439.5 4296.05,1324.0 4396.08,1266.25 4396.08,1150.75 4296.05,1093.0 4196.03,1150.75 4096.0,1093.0 3995.97,1150.75 3895.95,1093.0 3795.92,1150.75 3695.9,1093.0 3595.87,1150.75 3495.84,1093.0 3395.82,1150.75 3395.82,1266.25 3495.84,1324.0 3495.84,1439.5 3595.87,1497.25 3695.9,1439.5 3795.92,1497.25 3895.95,1439.5 3995.97,1497.25 4096.0,1439.5" /><polygon id="Base_6303" points="6696.67,1324.0 6696.67,1439.5 6596.65,1497.25 6596.65,1612.75 6496.62,1670.5 6496.62,1786.0 6396.6,1843.75 6296.57,1786.0 6196.54,1843.75 6096.52,1786.0 6096.52,1670.5 5996.49,1612.75 5996.49,1497.25 6096.52,1439.5 6096.52,1324.0 5996.49,1266.25 5996.49,1150.75 6096.52,1093.0 6196.54,1150.75 6296.57,1093.0 6396.6,1150.75 6496.62,1093.0 6596.65,1150.75 6696.67,1093.0 6796.7,1150.75 6796.7,1266.25" /><polygon id="Base_6304" points="6096.52,1324.0 6096.52,1439.5 5996.49,1497.25 5996.49,1612.75 5896.47,1670.5 5796.44,1612.75 5796.44,1497.25 5696.41,1439.5 5596.39,1497.25 5496.36,1439.5 5496.36,1324.0 5396.34,1266.25 5396.34,1150.75 5496.36,1093.0 5596.39,1150.75 5696.41,1093.0 5796.44,1150.75 5896.47,1093.0 5996.49,1150.75 5996.49,1266.25" /><polygon id="Base_6305" points="1295.27,2132.5 1195.25,2190.25 1095.22,2132.5 995.2,2190.25 895.17,2132.5 895.17,2017.0 995.2,1959.25 995.2,1843.75 1095.22,1786.0 1095.22,1670.5 1195.25,1612.75 1195.25,1497.25 1295.27,1439.5 1395.3,1497.25 1395.3,1612.75 1495.33,1670.5 1595.35,1612.75 1695.38,1670.5 1795.4,1612.75 1895.43,1670.5 1895.43,1786.0 1795.4,1843.75 1795.4,1959.25 1695.38,2017.0 1695.38,2132.5 1595.35,2190.25 1495.33,2132.5 1395.3,2190.25" /><polygon id="Base_6306" points="1695.38,2132.5 1795.4,2190.25 1795.4,2305.75 1895.43,2363.5 1995.46,2305.75 2095.48,2363.5 2095.48,2479.0 2195.51,2536.75 2295.53,2479.0 2395.56,2536.75 2495.59,2479.0 2495.59,2363.5 2595.61,2305.75 2695.64,2363.5 2795.66,2305.75 2795.66,2190.25 2695.64,2132.5 2695.64,2017.0 2595.61,1959.25 2595.61,1843.75 2495.59,1786.0 2495.59,1670.5 2395.56,1612.75 2295.53,1670.5 2195.51,1612.75 2095.48,1670.5 1995.46,1612.75 1895.43,1670.5 1895.43,1786.0 1795.4,1843.75 1795.4,1959.25 1695.38,2017.0" /><polygon id="Base_6307" points="3895.95,3172.0 3995.97,3229.75 3995.97,3345.25 4096.0,3403.0 4096.0,3518.5 4196.03,3576.25 4296.05,3518.5 4296.05,3403.0 4396.08,3345.25 4396.08,3229.75 4496.1,3172.0 4496.1,3056.5 4596.13,2998.75 4596.13,2883.25 4696.16,2825.5 4696.16,2710.0 4796.18,2652.25 4796.18,2536.75 4696.16,2479.0 4596.13,2536.75 4496.1,2479.0 4396.08,2536.75 4396.08,2652.25 4296.05,2710.0 4196.03,2652.25 4096.0,2710.0 4096.0,2825.5 3995.97,2883.25 3995.97,2998.75 3895.95,3056.5" /><polygon id="Base_6308" points="6696.67,2132.5 6696.67,2017.0 6596.65,1959.25 6596.65,1843.75 6496.62,1786.0 6396.6,1843.75 6296.57,1786.0 6196.54,1843.75 6096.52,1786.0 5996.49,1843.75 5996.49,1959.25 5896.47,2017.0 5896.47,2132.5 5796.44,2190.25 5696.41,2132.5 5596.39,2190.25 5596.39,2305.75 5496.36,2363.5 5496.36,2479.0 5596.39,2536.75 5596.39,2652.25 5696.41,2710.0 5696.41,2825.5 5796.44,2883.25 5796.44,2998.75 5896.47,3056.5 5996.49,2998.75 5996.49,2883.25 6096.52,2825.5 6096.52,2710.0 6196.54,2652.25 6196.54,2536.75 6296.57,2479.0 6396.6,2536.75 6496.62,2479.0 6496.62,2363.5 6596.65,2305.75 6596.65,2190.25" /><polygon id="Base_6309" points="695.12,3865.0 695.12,3749.5 795.14,3691.75 795.14,3576.25 695.12,3518.5 695.12,3403.0 795.14,3345.25 795.14,3229.75 895.17,3172.0 995.2,3229.75 995.2,3345.25 1095.22,3403.0 1195.25,3345.25 1295.27,3403.0 1395.3,3345.25 1495.33,3403.0 1495.33,3518.5 1395.3,3576.25 1395.3,3691.75 1295.27,3749.5 1295.27,3865.0 1195.25,3922.75 1095.22,3865.0 995.2,3922.75 895.17,3865.0 795.14,3922.75" /><polygon id="Base_6310" points="1895.43,3865.0 1795.4,3922.75 1795.4,4038.25 1895.43,4096.0 1895.43,4211.5 1795.4,4269.25 1695.38,4211.5 1595.35,4269.25 1495.33,4211.5 1395.3,4269.25 1295.27,4211.5 1295.27,4096.0 1195.25,4038.25 1195.25,3922.75 1295.27,3865.0 1295.27,3749.5 1395.3,3691.75 1395.3,3576.25 1495.33,3518.5 1495.33,3403.0 1595.35,3345.25 1695.38,3403.0 1795.4,3345.25 1895.43,3403.0 1995.46,3345.25 2095.48,3403.0 2095.48,3518.5 1995.46,3576.25 1995.46,3691.75 1895.43,3749.5" /><polygon id="Base_6311" points="2295.53,2825.5 2395.56,2883.25 2395.56,2998.75 2495.59,3056.5 2495.59,3172.0 2595.61,3229.75 2595.61,3345.25 2695.64,3403.0 2795.66,3345.25 2895.69,3403.0 2995.71,3345.25 3095.74,3403.0 3195.77,3345.25 3195.77,3229.75 3295.79,3172.0 3295.79,3056.5 3395.82,2998.75 3395.82,2883.25 3295.79,2825.5 3295.79,2710.0 3195.77,2652.25 3195.77,2536.75 3095.74,2479.0 3095.74,2363.5 2995.71,2305.75 2895.69,2363.5 2795.66,2305.75 2695.64,2363.5 2595.61,2305.75 2495.59,2363.5 2495.59,2479.0 2395.56,2536.75 2295.53,2479.0 2195.51,2536.75 2195.51,2652.25 2295.53,2710.0" /><polygon id="Base_6312" points="3195.77,3576.25 3095.74,3518.5 3095.74,3403.0 2995.71,3345.25 2895.69,3403.0 2795.66,3345.25 2695.64,3403.0 2695.64,3518.5 2595.61,3576.25 2595.61,3691.75 2695.64,3749.5 2695.64,3865.0 2595.61,3922.75 2595.61,4038.25 2695.64,4096.0 2795.66,4038.25 2895.69,4096.0 2995.71,4038.25 3095.74,4096.0 3195.77,4038.25 3195.77,3922.75 3295.79,3865.0 3295.79,3749.5 3195.77,3691.75" /><polygon id="Base_6313" points="5296.31,2363.5 5396.34,2305.75 5496.36,2363.5 5496.36,2479.0 5596.39,2536.75 5596.39,2652.25 5696.41,2710.0 5696.41,2825.5 5796.44,2883.25 5796.44,2998.75 5896.47,3056.5 5896.47,3172.0 5796.44,3229.75 5696.41,3172.0 5596.39,3229.75 5496.36,3172.0 5396.34,3229.75 5296.31,3172.0 5296.31,3056.5 5196.29,2998.75 5196.29,2883.25 5096.26,2825.5 5096.26,2710.0 4996.23,2652.25 4996.23,2536.75 4896.21,2479.0 4896.21,2363.5 4996.23,2305.75 5096.26,2363.5 5196.29,2305.75" /><polygon id="Base_6314" points="6196.54,2536.75 6196.54,2652.25 6096.52,2710.0 6096.52,2825.5 5996.49,2883.25 5996.49,2998.75 5896.47,3056.5 5896.47,3172.0 5796.44,3229.75 5796.44,3345.25 5896.47,3403.0 5996.49,3345.25 6096.52,3403.0 6096.52,3518.5 6196.54,3576.25 6296.57,3518.5 6296.57,3403.0 6396.6,3345.25 6396.6,3229.75 6496.62,3172.0 6596.65,3229.75 6696.67,3172.0 6696.67,3056.5 6596.65,2998.75 6596.65,2883.25 6696.67,2825.5 6696.67,2710.0 6796.7,2652.25 6796.7,2536.75 6896.73,2479.0 6896.73,2363.5 6996.75,2305.75 6996.75,2190.25 6896.73,2132.5 6796.7,2190.25 6696.67,2132.5 6596.65,2190.25 6596.65,2305.75 6496.62,2363.5 6496.62,2479.0 6396.6,2536.75 6296.57,2479.0" /><polygon id="Base_6316" points="4696.16,3403.0 4696.16,3518.5 4796.18,3576.25 4796.18,3691.75 4896.21,3749.5 4896.21,3865.0 4796.18,3922.75 4696.16,3865.0 4596.13,3922.75 4496.1,3865.0 4396.08,3922.75 4296.05,3865.0 4196.03,3922.75 4096.0,3865.0 3995.97,3922.75 3895.95,3865.0 3895.95,3749.5 3995.97,3691.75 3995.97,3576.25 4096.0,3518.5 4196.03,3576.25 4296.05,3518.5 4296.05,3403.0 4396.08,3345.25 4496.1,3403.0 4596.13,3345.25" /><polygon id="Base_6317" points="6196.54,4269.25 6196.54,4384.75 6096.52,4442.5 6096.52,4558.0 6196.54,4615.75 6296.57,4558.0 6396.6,4615.75 6396.6,4731.25 6496.62,4789.0 6596.65,4731.25 6596.65,4615.75 6696.67,4558.0 6696.67,4442.5 6796.7,4384.75 6796.7,4269.25 6696.67,4211.5 6596.65,4269.25 6496.62,4211.5 6496.62,4096.0 6396.6,4038.25 6396.6,3922.75 6296.57,3865.0 6196.54,3922.75 6196.54,4038.25 6096.52,4096.0 6096.52,4211.5" /><polygon id="Base_6318" points="6596.65,4731.25 6596.65,4615.75 6696.67,4558.0 6696.67,4442.5 6796.7,4384.75 6796.7,4269.25 6896.73,4211.5 6896.73,4096.0 6996.75,4038.25 7096.78,4096.0 7096.78,4211.5 7196.8,4269.25 7196.8,4384.75 7296.83,4442.5 7296.83,4558.0 7196.8,4615.75 7196.8,4731.25 7096.78,4789.0 6996.75,4731.25 6896.73,4789.0 6796.7,4731.25 6696.67,4789.0" /><polygon id="Base_6319" points="3595.87,4615.75 3495.84,4558.0 3495.84,4442.5 3395.82,4384.75 3295.79,4442.5 3295.79,4558.0 3195.77,4615.75 3095.74,4558.0 2995.71,4615.75 2995.71,4731.25 2895.69,4789.0 2895.69,4904.5 2795.66,4962.25 2795.66,5077.75 2895.69,5135.5 2895.69,5251.0 2795.66,5308.75 2795.66,5424.25 2895.69,5482.0 2895.69,5597.5 2995.71,5655.25 3095.74,5597.5 3095.74,5482.0 3195.77,5424.25 3195.77,5308.75 3295.79,5251.0 3395.82,5308.75 3495.84,5251.0 3595.87,5308.75 3695.9,5251.0 3795.92,5308.75 3895.95,5251.0 3895.95,5135.5 3795.92,5077.75 3795.92,4962.25 3695.9,4904.5 3695.9,4789.0 3595.87,4731.25" /><polygon id="Base_6320" points="4896.21,4442.5 4896.21,4558.0 4796.18,4615.75 4796.18,4731.25 4896.21,4789.0 4896.21,4904.5 4996.23,4962.25 4996.23,5077.75 5096.26,5135.5 5096.26,5251.0 5196.29,5308.75 5196.29,5424.25 5296.31,5482.0 5396.34,5424.25 5496.36,5482.0 5596.39,5424.25 5596.39,5308.75 5696.41,5251.0 5696.41,5135.5 5596.39,5077.75 5596.39,4962.25 5696.41,4904.5 5696.41,4789.0 5596.39,4731.25 5596.39,4615.75 5496.36,4558.0 5496.36,4442.5 5396.34,4384.75 5396.34,4269.25 5296.31,4211.5 5196.29,4269.25 5096.26,4211.5 4996.23,4269.25 4996.23,4384.75" /><polygon id="Base_6323" points="3395.82,6348.25 3395.82,6463.75 3295.79,6521.5 3295.79,6637.0 3195.77,6694.75 3195.77,6810.25 3095.74,6868.0 2995.71,6810.25 2895.69,6868.0 2795.66,6810.25 2695.64,6868.0 2595.61,6810.25 2495.59,6868.0 2395.56,6810.25 2295.53,6868.0 2195.51,6810.25 2195.51,6694.75 2095.48,6637.0 2095.48,6521.5 2195.51,6463.75 2195.51,6348.25 2295.53,6290.5 2395.56,6348.25 2495.59,6290.5 2595.61,6348.25 2695.64,6290.5 2695.64,6175.0 2795.66,6117.25 2895.69,6175.0 2995.71,6117.25 3095.74,6175.0 3195.77,6117.25 3295.79,6175.0 3295.79,6290.5" /><polygon id="Base_6324" points="5096.26,6175.0 4996.23,6117.25 4896.21,6175.0 4796.18,6117.25 4696.16,6175.0 4596.13,6117.25 4596.13,6001.75 4496.1,5944.0 4396.08,6001.75 4296.05,5944.0 4296.05,5828.5 4396.08,5770.75 4396.08,5655.25 4496.1,5597.5 4596.13,5655.25 4696.16,5597.5 4796.18,5655.25 4896.21,5597.5 4996.23,5655.25 5096.26,5597.5 5196.29,5655.25 5296.31,5597.5 5396.34,5655.25 5396.34,5770.75 5296.31,5828.5 5296.31,5944.0 5196.29,6001.75 5196.29,6117.25" /><polygon id="Base_6325" points="3995.97,7387.75 4096.0,7330.0 4096.0,7214.5 4196.03,7156.75 4196.03,7041.25 4296.05,6983.5 4296.05,6868.0 4196.03,6810.25 4196.03,6694.75 4096.0,6637.0 4096.0,6521.5 3995.97,6463.75 3995.97,6348.25 3895.95,6290.5 3795.92,6348.25 3695.9,6290.5 3595.87,6348.25 3495.84,6290.5 3395.82,6348.25 3395.82,6463.75 3295.79,6521.5 3295.79,6637.0 3195.77,6694.75 3195.77,6810.25 3295.79,6868.0 3295.79,6983.5 3395.82,7041.25 3495.84,6983.5 3595.87,7041.25 3695.9,6983.5 3795.92,7041.25 3795.92,7156.75 3895.95,7214.5 3895.95,7330.0" /><polygon id="Base_6326" points="6196.54,6694.75 6296.57,6637.0 6296.57,6521.5 6196.54,6463.75 6196.54,6348.25 6096.52,6290.5 6096.52,6175.0 5996.49,6117.25 5896.47,6175.0 5796.44,6117.25 5696.41,6175.0 5596.39,6117.25 5496.36,6175.0 5396.34,6117.25 5296.31,6175.0 5296.31,6290.5 5196.29,6348.25 5196.29,6463.75 5096.26,6521.5 5096.26,6637.0 5196.29,6694.75 5196.29,6810.25 5296.31,6868.0 5296.31,6983.5 5396.34,7041.25 5496.36,6983.5 5596.39,7041.25 5696.41,6983.5 5796.44,7041.25 5896.47,6983.5 5996.49,7041.25 6096.52,6983.5 6096.52,6868.0 6196.54,6810.25" /><polygon id="Base_6328" points="4096.0,4558.0 4096.0,4442.5 4196.03,4384.75 4296.05,4442.5 4396.08,4384.75 4496.1,4442.5 4596.13,4384.75 4696.16,4442.5 4796.18,4384.75 4896.21,4442.5 4896.21,4558.0 4796.18,4615.75 4796.18,4731.25 4896.21,4789.0 4896.21,4904.5 4796.18,4962.25 4696.16,4904.5 4596.13,4962.25 4496.1,4904.5 4396.08,4962.25 4296.05,4904.5 4196.03,4962.25 4196.03,5077.75 4096.0,5135.5 3995.97,5077.75 3895.95,5135.5 3795.92,5077.75 3795.92,4962.25 3695.9,4904.5 3695.9,4789.0 3595.87,4731.25 3595.87,4615.75 3695.9,4558.0 3795.92,4615.75 3895.95,4558.0 3995.97,4615.75" /><polygon id="Base_6329" points="4296.05,3865.0 4196.03,3922.75 4096.0,3865.0 3995.97,3922.75 3995.97,4038.25 4096.0,4096.0 4096.0,4211.5 3995.97,4269.25 3995.97,4384.75 4096.0,4442.5 4196.03,4384.75 4296.05,4442.5 4396.08,4384.75 4496.1,4442.5 4596.13,4384.75 4696.16,4442.5 4796.18,4384.75 4896.21,4442.5 4996.23,4384.75 4996.23,4269.25 4896.21,4211.5 4896.21,4096.0 4796.18,4038.25 4796.18,3922.75 4696.16,3865.0 4596.13,3922.75 4496.1,3865.0 4396.08,3922.75" /><polygon id="Base_6330" points="3395.82,1612.75 3495.84,1670.5 3495.84,1786.0 3595.87,1843.75 3595.87,1959.25 3695.9,2017.0 3795.92,1959.25 3895.95,2017.0 3995.97,1959.25 4096.0,2017.0 4196.03,1959.25 4196.03,1843.75 4296.05,1786.0 4296.05,1670.5 4396.08,1612.75 4396.08,1497.25 4296.05,1439.5 4196.03,1497.25 4096.0,1439.5 3995.97,1497.25 3895.95,1439.5 3795.92,1497.25 3695.9,1439.5 3595.87,1497.25 3495.84,1439.5 3395.82,1497.25" /><polygon id="Base_6331" points="4696.16,1670.5 4796.18,1612.75 4796.18,1497.25 4896.21,1439.5 4896.21,1324.0 4796.18,1266.25 4796.18,1150.75 4696.16,1093.0 4596.13,1150.75 4496.1,1093.0 4396.08,1150.75 4396.08,1266.25 4296.05,1324.0 4296.05,1439.5 4396.08,1497.25 4396.08,1612.75 4496.1,1670.5 4596.13,1612.75" /><polygon id="Base_6332" points="4096.0,2710.0 4196.03,2652.25 4296.05,2710.0 4396.08,2652.25 4396.08,2536.75 4296.05,2479.0 4296.05,2363.5 4196.03,2305.75 4196.03,2190.25 4096.0,2132.5 3995.97,2190.25 3995.97,2305.75 3895.95,2363.5 3895.95,2479.0 3795.92,2536.75 3795.92,2652.25 3895.95,2710.0 3995.97,2652.25" /><polygon id="Base_6333" points="895.17,4442.5 795.14,4384.75 795.14,4269.25 695.12,4211.5 695.12,4096.0 595.09,4038.25 595.09,3922.75 695.12,3865.0 795.14,3922.75 895.17,3865.0 995.2,3922.75 1095.22,3865.0 1195.25,3922.75 1195.25,4038.25 1295.27,4096.0 1295.27,4211.5 1195.25,4269.25 1095.22,4211.5 995.2,4269.25 995.2,4384.75" /><polygon id="Base_6334" points="995.2,4731.25 1095.22,4789.0 1095.22,4904.5 1195.25,4962.25 1195.25,5077.75 1295.27,5135.5 1395.3,5077.75 1495.33,5135.5 1595.35,5077.75 1595.35,4962.25 1495.33,4904.5 1495.33,4789.0 1395.3,4731.25 1395.3,4615.75 1295.27,4558.0 1295.27,4442.5 1395.3,4384.75 1395.3,4269.25 1295.27,4211.5 1195.25,4269.25 1095.22,4211.5 995.2,4269.25 995.2,4384.75 895.17,4442.5 795.14,4384.75 695.12,4442.5 695.12,4558.0 795.14,4615.75 795.14,4731.25 895.17,4789.0" /><polygon id="Base_6335" points="3995.97,4615.75 3895.95,4558.0 3795.92,4615.75 3695.9,4558.0 3595.87,4615.75 3495.84,4558.0 3495.84,4442.5 3395.82,4384.75 3295.79,4442.5 3195.77,4384.75 3195.77,4269.25 3295.79,4211.5 3295.79,4096.0 3395.82,4038.25 3495.84,4096.0 3595.87,4038.25 3695.9,4096.0 3795.92,4038.25 3795.92,3922.75 3895.95,3865.0 3995.97,3922.75 3995.97,4038.25 4096.0,4096.0 4096.0,4211.5 3995.97,4269.25 3995.97,4384.75 4096.0,4442.5 4096.0,4558.0" /><polygon id="Base_6336" points="7496.88,3749.5 7496.88,3865.0 7596.91,3922.75 7596.91,4038.25 7496.88,4096.0 7496.88,4211.5 7396.86,4269.25 7396.86,4384.75 7296.83,4442.5 7196.8,4384.75 7196.8,4269.25 7096.78,4211.5 7096.78,4096.0 6996.75,4038.25 6996.75,3922.75 7096.78,3865.0 7096.78,3749.5 7196.8,3691.75 7296.83,3749.5 7396.86,3691.75" /><polygon id="Base_6337" points="6996.75,4731.25 7096.78,4789.0 7096.78,4904.5 6996.75,4962.25 6996.75,5077.75 6896.73,5135.5 6796.7,5077.75 6696.67,5135.5 6596.65,5077.75 6496.62,5135.5 6396.6,5077.75 6396.6,4962.25 6496.62,4904.5 6496.62,4789.0 6596.65,4731.25 6696.67,4789.0 6796.7,4731.25 6896.73,4789.0" /><polygon id="Base_6338" points="5196.29,6463.75 5096.26,6521.5 5096.26,6637.0 4996.23,6694.75 4896.21,6637.0 4796.18,6694.75 4696.16,6637.0 4596.13,6694.75 4596.13,6810.25 4496.1,6868.0 4396.08,6810.25 4296.05,6868.0 4196.03,6810.25 4196.03,6694.75 4096.0,6637.0 4096.0,6521.5 3995.97,6463.75 3995.97,6348.25 4096.0,6290.5 4096.0,6175.0 4196.03,6117.25 4196.03,6001.75 4296.05,5944.0 4396.08,6001.75 4496.1,5944.0 4596.13,6001.75 4596.13,6117.25 4696.16,6175.0 4796.18,6117.25 4896.21,6175.0 4996.23,6117.25 5096.26,6175.0 5196.29,6117.25 5296.31,6175.0 5296.31,6290.5 5196.29,6348.25" /><polygon id="Base_6339" points="1395.3,2536.75 1495.33,2479.0 1495.33,2363.5 1595.35,2305.75 1595.35,2190.25 1495.33,2132.5 1395.3,2190.25 1295.27,2132.5 1195.25,2190.25 1095.22,2132.5 995.2,2190.25 895.17,2132.5 795.14,2190.25 795.14,2305.75 895.17,2363.5 895.17,2479.0 995.2,2536.75 995.2,2652.25 1095.22,2710.0 1195.25,2652.25 1195.25,2536.75 1295.27,2479.0" /><polygon id="Base_6340" points="1295.27,2825.5 1195.25,2883.25 1095.22,2825.5 1095.22,2710.0 1195.25,2652.25 1195.25,2536.75 1295.27,2479.0 1395.3,2536.75 1495.33,2479.0 1595.35,2536.75 1595.35,2652.25 1495.33,2710.0 1495.33,2825.5 1395.3,2883.25" /><polygon id="Base_6341" points="1695.38,3172.0 1595.35,3229.75 1595.35,3345.25 1695.38,3403.0 1795.4,3345.25 1895.43,3403.0 1995.46,3345.25 2095.48,3403.0 2195.51,3345.25 2295.53,3403.0 2395.56,3345.25 2395.56,3229.75 2495.59,3172.0 2495.59,3056.5 2395.56,2998.75 2395.56,2883.25 2295.53,2825.5 2295.53,2710.0 2195.51,2652.25 2095.48,2710.0 2095.48,2825.5 1995.46,2883.25 1995.46,2998.75 1895.43,3056.5 1795.4,2998.75 1695.38,3056.5" /><polygon id="Base_6342" points="1095.22,2825.5 1195.25,2883.25 1295.27,2825.5 1395.3,2883.25 1495.33,2825.5 1595.35,2883.25 1595.35,2998.75 1695.38,3056.5 1695.38,3172.0 1595.35,3229.75 1595.35,3345.25 1495.33,3403.0 1395.3,3345.25 1295.27,3403.0 1195.25,3345.25 1095.22,3403.0 995.2,3345.25 995.2,3229.75 895.17,3172.0 895.17,3056.5 995.2,2998.75 995.2,2883.25" /><polygon id="Base_6343" points="3595.87,2190.25 3695.9,2132.5 3695.9,2017.0 3595.87,1959.25 3595.87,1843.75 3495.84,1786.0 3395.82,1843.75 3395.82,1959.25 3295.79,2017.0 3295.79,2132.5 3195.77,2190.25 3195.77,2305.75 3095.74,2363.5 3095.74,2479.0 3195.77,2536.75 3195.77,2652.25 3295.79,2710.0 3395.82,2652.25 3395.82,2536.75 3495.84,2479.0 3495.84,2363.5 3595.87,2305.75" /><polygon id="Base_6344" points="3695.9,2479.0 3695.9,2363.5 3595.87,2305.75 3595.87,2190.25 3695.9,2132.5 3695.9,2017.0 3795.92,1959.25 3895.95,2017.0 3995.97,1959.25 4096.0,2017.0 4096.0,2132.5 3995.97,2190.25 3995.97,2305.75 3895.95,2363.5 3895.95,2479.0 3795.92,2536.75" /><polygon id="Base_6345" points="3495.84,3056.5 3595.87,2998.75 3695.9,3056.5 3795.92,2998.75 3895.95,3056.5 3995.97,2998.75 3995.97,2883.25 4096.0,2825.5 4096.0,2710.0 3995.97,2652.25 3895.95,2710.0 3795.92,2652.25 3695.9,2710.0 3595.87,2652.25 3495.84,2710.0 3395.82,2652.25 3295.79,2710.0 3295.79,2825.5 3395.82,2883.25 3395.82,2998.75" /><polygon id="Base_6346" points="2395.56,3229.75 2395.56,3345.25 2295.53,3403.0 2195.51,3345.25 2095.48,3403.0 2095.48,3518.5 1995.46,3576.25 1995.46,3691.75 1895.43,3749.5 1895.43,3865.0 1995.46,3922.75 2095.48,3865.0 2195.51,3922.75 2295.53,3865.0 2395.56,3922.75 2495.59,3865.0 2595.61,3922.75 2695.64,3865.0 2695.64,3749.5 2595.61,3691.75 2595.61,3576.25 2695.64,3518.5 2695.64,3403.0 2595.61,3345.25 2595.61,3229.75 2495.59,3172.0" /><polygon id="Base_6347" points="2495.59,4789.0 2595.61,4731.25 2695.64,4789.0 2695.64,4904.5 2795.66,4962.25 2895.69,4904.5 2895.69,4789.0 2995.71,4731.25 2995.71,4615.75 3095.74,4558.0 3195.77,4615.75 3295.79,4558.0 3295.79,4442.5 3195.77,4384.75 3195.77,4269.25 3295.79,4211.5 3295.79,4096.0 3195.77,4038.25 3095.74,4096.0 2995.71,4038.25 2895.69,4096.0 2795.66,4038.25 2695.64,4096.0 2595.61,4038.25 2495.59,4096.0 2495.59,4211.5 2395.56,4269.25 2395.56,4384.75 2295.53,4442.5 2295.53,4558.0 2395.56,4615.75 2395.56,4731.25" /><polygon id="Base_6348" points="4996.23,1959.25 5096.26,2017.0 5096.26,2132.5 4996.23,2190.25 4996.23,2305.75 4896.21,2363.5 4796.18,2305.75 4796.18,2190.25 4696.16,2132.5 4696.16,2017.0 4796.18,1959.25 4796.18,1843.75 4696.16,1786.0 4696.16,1670.5 4796.18,1612.75 4896.21,1670.5 4996.23,1612.75 5096.26,1670.5 5096.26,1786.0 4996.23,1843.75" /><polygon id="Base_6349" points="5496.36,1439.5 5496.36,1324.0 5396.34,1266.25 5396.34,1150.75 5296.31,1093.0 5196.29,1150.75 5096.26,1093.0 4996.23,1150.75 4896.21,1093.0 4796.18,1150.75 4796.18,1266.25 4896.21,1324.0 4896.21,1439.5 4796.18,1497.25 4796.18,1612.75 4896.21,1670.5 4996.23,1612.75 5096.26,1670.5 5196.29,1612.75 5196.29,1497.25 5296.31,1439.5 5396.34,1497.25" /><polygon id="Base_6350" points="5796.44,2190.25 5896.47,2132.5 5896.47,2017.0 5996.49,1959.25 5996.49,1843.75 6096.52,1786.0 6096.52,1670.5 5996.49,1612.75 5896.47,1670.5 5796.44,1612.75 5796.44,1497.25 5696.41,1439.5 5596.39,1497.25 5496.36,1439.5 5396.34,1497.25 5396.34,1612.75 5496.36,1670.5 5496.36,1786.0 5596.39,1843.75 5596.39,1959.25 5496.36,2017.0 5496.36,2132.5 5596.39,2190.25 5696.41,2132.5" /><polygon id="Base_6351" points="5196.29,3691.75 5096.26,3749.5 4996.23,3691.75 4896.21,3749.5 4796.18,3691.75 4796.18,3576.25 4896.21,3518.5 4896.21,3403.0 4996.23,3345.25 5096.26,3403.0 5196.29,3345.25 5196.29,3229.75 5296.31,3172.0 5396.34,3229.75 5496.36,3172.0 5596.39,3229.75 5696.41,3172.0 5796.44,3229.75 5796.44,3345.25 5896.47,3403.0 5896.47,3518.5 5796.44,3576.25 5696.41,3518.5 5596.39,3576.25 5496.36,3518.5 5396.34,3576.25 5396.34,3691.75 5296.31,3749.5" /><polygon id="Base_6352" points="6096.52,4211.5 6096.52,4096.0 6196.54,4038.25 6196.54,3922.75 6096.52,3865.0 5996.49,3922.75 5896.47,3865.0 5796.44,3922.75 5796.44,4038.25 5696.41,4096.0 5696.41,4211.5 5596.39,4269.25 5496.36,4211.5 5396.34,4269.25 5396.34,4384.75 5496.36,4442.5 5496.36,4558.0 5596.39,4615.75 5696.41,4558.0 5796.44,4615.75 5896.47,4558.0 5996.49,4615.75 6096.52,4558.0 6096.52,4442.5 6196.54,4384.75 6196.54,4269.25" /><polygon id="Base_6353" points="6896.73,3056.5 6796.7,2998.75 6696.67,3056.5 6696.67,3172.0 6596.65,3229.75 6496.62,3172.0 6396.6,3229.75 6396.6,3345.25 6296.57,3403.0 6296.57,3518.5 6396.6,3576.25 6496.62,3518.5 6596.65,3576.25 6696.67,3518.5 6796.7,3576.25 6896.73,3518.5 6996.75,3576.25 7096.78,3518.5 7096.78,3403.0 7196.8,3345.25 7196.8,3229.75 7096.78,3172.0 7096.78,3056.5 6996.75,2998.75" /><polygon id="Base_6354" points="7296.83,3749.5 7396.86,3691.75 7496.88,3749.5 7596.91,3691.75 7596.91,3576.25 7496.88,3518.5 7496.88,3403.0 7396.86,3345.25 7396.86,3229.75 7296.83,3172.0 7196.8,3229.75 7196.8,3345.25 7096.78,3403.0 7096.78,3518.5 6996.75,3576.25 6996.75,3691.75 7096.78,3749.5 7196.8,3691.75" /><polygon id="Base_6355" points="6196.54,3576.25 6296.57,3518.5 6396.6,3576.25 6496.62,3518.5 6596.65,3576.25 6596.65,3691.75 6696.67,3749.5 6696.67,3865.0 6796.7,3922.75 6896.73,3865.0 6996.75,3922.75 6996.75,4038.25 6896.73,4096.0 6896.73,4211.5 6796.7,4269.25 6696.67,4211.5 6596.65,4269.25 6496.62,4211.5 6496.62,4096.0 6396.6,4038.25 6396.6,3922.75 6296.57,3865.0 6296.57,3749.5 6196.54,3691.75" /><polygon id="Base_6356" points="1195.25,5308.75 1295.27,5251.0 1295.27,5135.5 1395.3,5077.75 1495.33,5135.5 1595.35,5077.75 1695.38,5135.5 1695.38,5251.0 1795.4,5308.75 1795.4,5424.25 1695.38,5482.0 1695.38,5597.5 1795.4,5655.25 1795.4,5770.75 1695.38,5828.5 1695.38,5944.0 1595.35,6001.75 1595.35,6117.25 1695.38,6175.0 1695.38,6290.5 1595.35,6348.25 1495.33,6290.5 1395.3,6348.25 1295.27,6290.5 1295.27,6175.0 1195.25,6117.25 1195.25,6001.75 1095.22,5944.0 1095.22,5828.5 1195.25,5770.75 1195.25,5655.25 1295.27,5597.5 1295.27,5482.0 1195.25,5424.25" /><polygon id="Base_6357" points="1795.4,5308.75 1795.4,5424.25 1695.38,5482.0 1695.38,5597.5 1795.4,5655.25 1795.4,5770.75 1895.43,5828.5 1995.46,5770.75 2095.48,5828.5 2195.51,5770.75 2195.51,5655.25 2295.53,5597.5 2295.53,5482.0 2195.51,5424.25 2095.48,5482.0 1995.46,5424.25 1995.46,5308.75 1895.43,5251.0" /><polygon id="Base_6358" points="2795.66,6117.25 2695.64,6175.0 2695.64,6290.5 2595.61,6348.25 2495.59,6290.5 2395.56,6348.25 2295.53,6290.5 2195.51,6348.25 2095.48,6290.5 2095.48,6175.0 2195.51,6117.25 2195.51,6001.75 2295.53,5944.0 2295.53,5828.5 2195.51,5770.75 2195.51,5655.25 2295.53,5597.5 2395.56,5655.25 2495.59,5597.5 2595.61,5655.25 2695.64,5597.5 2795.66,5655.25 2795.66,5770.75 2895.69,5828.5 2895.69,5944.0 2995.71,6001.75 2995.71,6117.25 2895.69,6175.0" /><polygon id="Base_6359" points="3195.77,5308.75 3195.77,5424.25 3095.74,5482.0 3095.74,5597.5 2995.71,5655.25 2895.69,5597.5 2795.66,5655.25 2795.66,5770.75 2895.69,5828.5 2895.69,5944.0 2995.71,6001.75 2995.71,6117.25 3095.74,6175.0 3195.77,6117.25 3195.77,6001.75 3295.79,5944.0 3295.79,5828.5 3395.82,5770.75 3395.82,5655.25 3495.84,5597.5 3595.87,5655.25 3695.9,5597.5 3695.9,5482.0 3795.92,5424.25 3795.92,5308.75 3695.9,5251.0 3595.87,5308.75 3495.84,5251.0 3395.82,5308.75 3295.79,5251.0" /><polygon id="Base_6360" points="3795.92,5308.75 3795.92,5424.25 3695.9,5482.0 3695.9,5597.5 3795.92,5655.25 3795.92,5770.75 3895.95,5828.5 3895.95,5944.0 3995.97,6001.75 3995.97,6117.25 4096.0,6175.0 4196.03,6117.25 4196.03,6001.75 4296.05,5944.0 4296.05,5828.5 4196.03,5770.75 4196.03,5655.25 4296.05,5597.5 4296.05,5482.0 4196.03,5424.25 4196.03,5308.75 4096.0,5251.0 4096.0,5135.5 3995.97,5077.75 3895.95,5135.5 3895.95,5251.0" /><polygon id="Base_6361" points="6296.57,5251.0 6296.57,5135.5 6196.54,5077.75 6096.52,5135.5 5996.49,5077.75 5896.47,5135.5 5796.44,5077.75 5696.41,5135.5 5696.41,5251.0 5596.39,5308.75 5596.39,5424.25 5696.41,5482.0 5796.44,5424.25 5896.47,5482.0 5896.47,5597.5 5996.49,5655.25 5996.49,5770.75 6096.52,5828.5 6196.54,5770.75 6196.54,5655.25 6296.57,5597.5 6296.57,5482.0 6396.6,5424.25 6396.6,5308.75" /><polygon id="Base_6362" points="6396.6,5424.25 6396.6,5308.75 6296.57,5251.0 6296.57,5135.5 6396.6,5077.75 6496.62,5135.5 6596.65,5077.75 6696.67,5135.5 6796.7,5077.75 6896.73,5135.5 6896.73,5251.0 6996.75,5308.75 6996.75,5424.25 6896.73,5482.0 6896.73,5597.5 6796.7,5655.25 6696.67,5597.5 6696.67,5482.0 6596.65,5424.25 6496.62,5482.0" /><polygon id="Base_6363" points="5996.49,6001.75 6096.52,5944.0 6096.52,5828.5 6196.54,5770.75 6296.57,5828.5 6396.6,5770.75 6496.62,5828.5 6596.65,5770.75 6596.65,5655.25 6696.67,5597.5 6796.7,5655.25 6796.7,5770.75 6696.67,5828.5 6696.67,5944.0 6796.7,6001.75 6796.7,6117.25 6696.67,6175.0 6696.67,6290.5 6596.65,6348.25 6496.62,6290.5 6396.6,6348.25 6396.6,6463.75 6296.57,6521.5 6196.54,6463.75 6196.54,6348.25 6096.52,6290.5 6096.52,6175.0 5996.49,6117.25" /><polygon id="Base_18204" points="1395.3,4731.25 1495.33,4789.0 1495.33,4904.5 1595.35,4962.25 1595.35,5077.75 1695.38,5135.5 1795.4,5077.75 1795.4,4962.25 1895.43,4904.5 1895.43,4789.0 1995.46,4731.25 1995.46,4615.75 2095.48,4558.0 2095.48,4442.5 1995.46,4384.75 1995.46,4269.25 1895.43,4211.5 1795.4,4269.25 1695.38,4211.5 1595.35,4269.25 1495.33,4211.5 1395.3,4269.25 1395.3,4384.75 1295.27,4442.5 1295.27,4558.0 1395.3,4615.75" /></svg>';