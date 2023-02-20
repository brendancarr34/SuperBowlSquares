import React, { useLayoutEffect, useState } from 'react';
import GridLayout from "react-grid-layout";

export class Grid extends React.Component {
    render() {

        function createRow(row_number) {
            const row = []
            for (let index = 0; index < 11; index++) {
                let key = (index) + "_" + (row_number);
                row[index] = {i: key, x: index, y: row_number, w: 1, h: 1}
            }
            return row
        }

        function graySquare(top, left) {
            let margins = top + 'px -10px -10px ' + left + 'px';
            return {
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                backgroundColor: 'white', 
                color: 'gray',
                margin: margins
            }
        }

        function blackSquare(top, left) {
            let margins = top + 'px -10px -10px ' + left + 'px';
            return {
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                backgroundColor: 'white', 
                color: 'black',
                margin: margins
            }
        }

        function blackSquare(top, left, font_size) {
            let margins = top + 'px -10px -10px ' + left + 'px';
            return {
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                backgroundColor: 'white', 
                color: 'black',
                'font-size': font_size,
                margin: margins
            }
        }

        function greenSquare(top, left, font_size) {
            let margins = top + 'px -10px -10px ' + left + 'px';
            return {
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                backgroundColor: 'green', 
                color: 'white',
                'font-size': font_size,
                margin: margins
            }
        }

        function pinkSquare(top, left, font_size) {
            let margins = top + 'px -10px -10px ' + left + 'px';
            return {
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                backgroundColor: 'pink', 
                color: 'black',
                'font-size': font_size,
                margin: margins
            }
        }

        function unknownNumber(top, left) {
            let margins = top + 'px -10px -10px ' + left + 'px';
            return {
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                backgroundColor: 'gray', 
                color: 'black',
                margin: margins
            }
        }

        const layout = [
            ...createRow(0),
            ...createRow(1),
            ...createRow(2),
            ...createRow(3),
            ...createRow(4),
            ...createRow(5),
            ...createRow(6),
            ...createRow(7),
            ...createRow(8),
            ...createRow(9),
            ... createRow(10)
        ];

        return (
            <GridLayout
                layout={layout}
                cols={11}
                rowHeight={29}
                width={434}
                style={{backgroundColor: 'gray', 
                display: 'flex', 
                'justify-content': 'center', 
                'align-items': 'left'
            }}
                
            >
                <div key="0_0" style={unknownNumber(0, 0)}></div>
                <div key="1_0" style={unknownNumber(0, 0)}>❔</div>
                <div key="2_0" style={unknownNumber(0, -5)}>❔</div>
                <div key="3_0" style={greenSquare(0, -10)}>5</div>
                <div key="4_0" style={unknownNumber(0, -15)}>❔</div>
                <div key="5_0" style={unknownNumber(0, -20)}>❔</div>
                <div key="6_0" style={unknownNumber(0, -25)}>❔</div>
                <div key="7_0" style={unknownNumber(0, -30)}>❔</div>
                <div key="8_0" style={unknownNumber(0, -35)}>❔</div>
                <div key="9_0" style={unknownNumber(0, -40)}>❔</div>
                <div key="10_0" style={unknownNumber(0, -45)}>❔</div>

                <div key="0_1" style={unknownNumber(0,0)}>❔</div>
                <div key="1_1" style={graySquare(0, 0)}>1</div>
                <div key="2_1" style={graySquare(0, -5)}>2</div>
                <div key="3_1" style={graySquare(0, -10)}>3</div>
                <div key="4_1" style={graySquare(0, -15)}>4</div>
                <div key="5_1" style={graySquare(0, -20)}>5</div>
                <div key="6_1" style={graySquare(0, -25)}>6</div>
                <div key="7_1" style={graySquare(0, -30)}>7</div>
                <div key="8_1" style={graySquare(0, -35)}>8</div>
                <div key="9_1" style={graySquare(0, -40)}>9</div>
                <div key="10_1" style={graySquare(0, -45)}>10</div>
                
                <div key="0_2" style={unknownNumber(-5, 0)}>❔</div>
                <div key="1_2" style={graySquare(-5,  0)}>11</div>
                <div key="2_2" style={graySquare(-5,  -5)}>12</div>
                <div key="3_2" style={graySquare(-5,  -10)}>13</div>
                <div key="4_2" style={graySquare(-5,  -15)}>14</div>
                <div key="5_2" style={graySquare(-5,  -20)}>15</div>
                <div key="6_2" style={graySquare(-5,  -25)}>16</div>
                <div key="7_2" style={graySquare(-5,  -30)}>17</div>
                <div key="8_2" style={graySquare(-5,  -35)}>18</div>
                <div key="9_2" style={pinkSquare(-5,  -40)}>HC</div>
                <div key="10_2" style={graySquare(-5,  -45)}>20</div>
                
                <div key="0_3" style={unknownNumber(-10, 0)}>❔</div>
                <div key="1_3" style={pinkSquare(-10, 0)}>BC</div>
                <div key="2_3" style={graySquare(-10, -5)}>22</div>
                <div key="3_3" style={graySquare(-10, -10)}>23</div>
                <div key="4_3" style={graySquare(-10, -15)}>24</div>
                <div key="5_3" style={graySquare(-10, -20)}>25</div>
                <div key="6_3" style={graySquare(-10, -25)}>26</div>
                <div key="7_3" style={graySquare(-10, -30)}>27</div>
                <div key="8_3" style={pinkSquare(-10, -35, '9px')}>Long<br/>Name</div>
                {/* <div key="8_3" style={graySquare(-10, -35)}>28</div> */}
                <div key="9_3" style={graySquare(-10, -40)}>29</div>
                <div key="10_3" style={graySquare(-10, -45)}>30</div>
               
                <div key="0_4" style={unknownNumber(-15, 0)}>❔</div>
                <div key="1_4" style={graySquare(-15, 0)}>31</div>
                <div key="2_4" style={graySquare(-15, -5)}>32</div>
                <div key="3_4" style={graySquare(-15, -10)}>33</div>
                <div key="4_4" style={graySquare(-15, -15)}>34</div>
                <div key="5_4" style={graySquare(-15, -20)}>35</div>
                <div key="6_4" style={graySquare(-15, -25)}>36</div>
                <div key="7_4" style={graySquare(-15, -30)}>37</div>
                <div key="8_4" style={graySquare(-15, -35)}>38</div>
                <div key="9_4" style={graySquare(-15, -40)}>39</div>
                <div key="10_4" style={graySquare(-15, -45)}>40</div>

                <div key="0_5" style={unknownNumber(-20, 0)}>❔</div>
                <div key="1_5" style={graySquare(-20, 0)}>41</div>
                <div key="2_5" style={graySquare(-20, -5)}>42</div>
                <div key="3_5" style={pinkSquare(-20, -10)}>HC</div>
                <div key="4_5" style={graySquare(-20, -15)}>44</div>
                <div key="5_5" style={graySquare(-20, -20)}>45</div>
                <div key="6_5" style={graySquare(-20, -25)}>46</div>
                <div key="7_5" style={graySquare(-20, -30)}>47</div>
                <div key="8_5" style={graySquare(-20, -35)}>48</div>
                <div key="9_5" style={graySquare(-20, -40)}>49</div>
                <div key="10_5" style={graySquare(-20, -45)}>50</div>

                <div key="0_6" style={unknownNumber(-25, 0)}>❔</div>
                <div key="1_6" style={graySquare(-25, 0)}>51</div>
                <div key="2_6" style={graySquare(-25, -5)}>52</div>
                <div key="3_6" style={graySquare(-25, -10)}>53</div>
                <div key="4_6" style={graySquare(-25, -15)}>54</div>
                <div key="5_6" style={graySquare(-25, -20)}>55</div>
                <div key="6_6" style={graySquare(-25, -25)}>56</div>
                <div key="7_6" style={graySquare(-25, -30)}>57</div>
                <div key="8_6" style={graySquare(-25, -35)}>58</div>
                <div key="9_6" style={graySquare(-25, -40)}>59</div>
                <div key="10_6" style={graySquare(-25, -45)}>60</div>

                <div key="0_7" style={unknownNumber(-30, 0)}>❔</div>
                <div key="1_7" style={graySquare(-30, 0)}>61</div>
                <div key="2_7" style={graySquare(-30, -5)}>62</div>
                <div key="3_7" style={graySquare(-30, -10)}>63</div>
                <div key="4_7" style={graySquare(-30, -15)}>64</div>
                <div key="5_7" style={graySquare(-30, -20)}>65</div>
                <div key="6_7" style={graySquare(-30, -25)}>66</div>
                <div key="7_7" style={graySquare(-30, -30)}>67</div>
                <div key="8_7" style={graySquare(-30, -35)}>68</div>
                <div key="9_7" style={graySquare(-30, -40)}>69</div>
                <div key="10_7" style={graySquare(-30, -45)}>70</div>

                <div key="0_8" style={unknownNumber(-35, 0)}>❔</div>
                <div key="1_8" style={graySquare(-35, 0)}>71</div>
                <div key="2_8" style={graySquare(-35, -5)}>72</div>
                <div key="3_8" style={graySquare(-35, -10)}>73</div>
                <div key="4_8" style={graySquare(-35, -15)}>74</div>
                <div key="5_8" style={graySquare(-35, -20)}>75</div>
                <div key="6_8" style={graySquare(-35, -25)}>76</div>
                <div key="7_8" style={graySquare(-35, -30)}>77</div>
                <div key="8_8" style={graySquare(-35, -35)}>78</div>
                <div key="9_8" style={graySquare(-35, -40)}>79</div>
                <div key="10_8" style={graySquare(-35, -45)}>80</div>

                <div key="0_9" style={unknownNumber(-40, 0)}>❔</div>
                <div key="1_9" style={graySquare(-40, 0)}>81</div>
                <div key="2_9" style={graySquare(-40, -5)}>82</div>
                <div key="3_9" style={graySquare(-40, -10)}>83</div>
                <div key="4_9" style={graySquare(-40, -15)}>84</div>
                <div key="5_9" style={graySquare(-40, -20)}>85</div>
                <div key="6_9" style={graySquare(-40, -25)}>86</div>
                <div key="7_9" style={graySquare(-40, -30)}>87</div>
                <div key="8_9" style={graySquare(-40, -35)}>88</div>
                <div key="9_9" style={graySquare(-40, -40)}>89</div>
                <div key="10_9" style={graySquare(-40, -45)}>90</div>
                
                <div key="0_10" style={unknownNumber(-45, 0)}>❔</div>
                <div key="1_10" style={graySquare(-45, 0)}>91</div>
                <div key="2_10" style={graySquare(-45, -5)}>92</div>
                <div key="3_10" style={graySquare(-45, -10)}>93</div>
                <div key="4_10" style={graySquare(-45, -15)}>94</div>
                <div key="5_10" style={graySquare(-45, -20)}>95</div>
                <div key="6_10" style={graySquare(-45, -25)}>96</div>
                <div key="7_10" style={graySquare(-45, -30)}>97</div>
                <div key="8_10" style={graySquare(-45, -35)}>98</div>
                <div key="9_10" style={graySquare(-45, -40)}>99</div>
                <div key="10_10" style={graySquare(-45, -45)}>100</div>
            </GridLayout>
        );
    }
}