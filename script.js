
class Sudoku {
    constructor(width, height, board_string) {
        this.width = width
        this.height = height
        this.board = board_string.split('').map(c => {
            if (c === 'x')
                return null
            else
                return parseInt(c);
        })
    }
}

const get_board_url = 'https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuBoard/1?fbclid=IwAR0Zs1QuyeuDFGTR5S-EaWCMw7mV3ExT6KTWMUvAF-tnt0xoIQqX6m3f9Ig'

var sudoku

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    data: null
}

function validateInputCell(id)
{
    const elem = document.getElementById(`${id}`)
    const input = elem.innerText

    if (input.length > 1)
        elem.innerText = input[0]

    
    if (!input.match(/\d/))
        elem.innerText = ''
}

fetch(get_board_url, requestOptions)
    .then(response =>
    {
        if (!response.ok)    
            throw new Error("Could not fetch board.")
    
        return response.json()
    })
    .then(data =>
    {
        requestOptions.data = data
        console.log('API response: ', requestOptions.data)

        sudoku = new Sudoku(
            requestOptions.data.width,
            requestOptions.data.height,
            requestOptions.data.board)

        for (let i = 0; i < sudoku.width * sudoku.height; ++i)
        {
            var value = sudoku.board[i]
            var id_attrib = `id="${i}"`
            var class_attrib = `class="${value == null ? "input-cell" : "locked-cell"}"`
            var edit_attrib = value == null ? 'contenteditable="true"' : ''
            var oninput_attrib = `oninput="validateInputCell(${i})"`
            var onclick_attrib = `onclick=`
            $('#board').append(`<div ${id_attrib} ${class_attrib} ${edit_attrib} ${oninput_attrib} ${onclick_attrib}>${value ?? ''}<div>`)
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

