function resetCells(sudoku) {
    for (let i = 0; i < sudoku.width * sudoku.height; ++i)
    {
        if(sudoku.board[i] == null)
            $(`#${i}`).val('');
    }
}

function showMessage(message) {
    const elem = $('#err-msg');
  
    // Update content and make the element visible
    elem.text(message).fadeIn();
  
    // Set a timeout to hide the element after 3 seconds
    setTimeout(() => {
        elem.fadeOut();
    }, 3000);
  }

$(document).ready(function() {
    // setup
    let request = $.ajax({
        url: SUDOKU_API_URL,
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            sudoku = new Sudoku(data.width, data.height, data.board)

            $('#res').click(function() {
                sudoku.reset()
                resetCells(sudoku)
            })

            $('#sub').click(function() {

                if(sudoku.solved())
                {
                    showMessage("You solved it!")
                }
                else 
                {
                    if(sudoku.board.some(x => x == null))
                    {
                        showMessage('You left some tiles empty') 
                    }
                    else
                    {
                        showMessage('Not a valid solution, try again!')
                    }
                }
            })

            // Set grid template style
            $('#board').css({
                'grid-template-columns': `repeat(${sudoku.width}, var(--cell-size))`,
                'grid-template-rows': `repeat(${sudoku.height}, var(--cell-size))`
            })

            // Initialize board elements
            for (let i = 0; i < sudoku.width * sudoku.height; ++i)
            {
                var value = sudoku.board[i]
                var element = value == null
                    ? `<input id="${i}" class="input-cell" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">`
                    : `<div id="${i}" class="locked-cell">${value}</div>`

                $('#board').append(element)

                $(`#${i}`).on('blur', function() {
                    const value = $(this).val()
                    sudoku.board[i] = value == '' ? null : parseInt(value)
                })
            }
        },
        error: function(_, status, error) {
            console.error('API error:', status, error)
        }
    })
})