export const topNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
export const sideNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
export const empty_row = [
    false, false, false, false,false, 
    false, false, false,false, false,
];
export const emptyBoard = () => {
    return [
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
        [false, false, false, false, false, false, false, false,false, false], 
    ];
} 

export const emptyNameRow = [
    '','','','','','','','','',''
]
export const emptyNameBoard = () => { 
    return [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''], 
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ]
}