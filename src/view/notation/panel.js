/**
  Game notation panel.
  @namespace chess.view.notation
  @class Panel
  @extends View
  @constructor
  @param {Object} config
  @example
 	children:[
 	...
 	{
		 type:'chess.view.notation.Panel',
		 notations:'long',
		 showContextMenu:true
	 }
 	...
 */
chess.view.notation.Panel = new Class({
    Extends:ludo.View,
    type:'chess.view.notation.Panel',
    module:'chess',
    submodule:'notation',
    css : {
        'overflow-y' : 'auto'
    },
    highlightedMove:undefined,
    moveMap:{},
    moveMapNotation:{},
    notationKey:'m',
	/**
	 * Long or short notations. Example of long: "e2-e4". Example of short: "e4".
	 * Valid values : "short" and "long"
	 * @config notations
	 * @type {String}
	 * @default 'short'
	 */
    notations:'short',
    contextMenuMove:undefined,
    currentMoveIndex:0,
    moveIdPrefix:'',
    _showPlayedOnly:false,

	/**
	 * Show context menu for grading of moves, comments etc
	 * @config showContextMenu
	 * @type {Boolean}
	 * @default false
	 */
    showContextMenu : false,

    setController:function (controller) {
        this.parent(controller);
        this.controller = controller;
        this.controller.addEvent('startOfGame', this.goToStartOfBranch.bind(this));
        this.controller.addEvent('newGame', this.showMoves.bind(this));
        this.controller.addEvent('deleteMove', this.showMoves.bind(this));
        this.controller.addEvent('setPosition', this.setCurrentMove.bind(this));
        this.controller.addEvent('nextmove', this.setCurrentMove.bind(this));
        this.controller.addEvent('updateMove', this.updateMove.bind(this));
        this.controller.addEvent('newMove', this.appendMove.bind(this));
        // this.controller.addEvent('newVariation', this.createNewVariation.bind(this));
    },
    ludoConfig:function (config) {
        this.parent(config);

        this.notations = config.notations || this.notations;
        if(config.showContextMenu !== undefined) this.showContextMenu = config.showContextMenu;
        if(this.showContextMenu)this.contextMenu = this.getContextMenuConfig();
        if (this.notations === 'long') {
            this.notationKey = 'lm';
        } else {
            this.notationKey = 'm';
        }

        this.moveIdPrefix = 'move-' + String.uniqueID() + '-';
    },

    showPlayedOnly:function () {
        this._showPlayedOnly = true;
    },

    getContextMenuConfig:function () {
        return {
            listeners:{
                click:function (el) {
                    switch (el.action) {
                        case 'grade':
                            this.fireEvent('gradeMove', [this.getContextMenuMove(), el.icon]);
                            break;
                        case 'commentBefore':
                            this.fireEvent('commentBefore', [this.getContextMenuMove(), el.icon]);
                            break;
                        case 'commentAfter':
                            this.fireEvent('commentAfter', [this.getContextMenuMove(), el.icon]);
                            break;
                    }
                }.bind(this),
                selectorclick:function (el) {
                    this.setContextMenuMove(el);
                }.bind(this)
            },
            selector:'notation-chess-move',
            children:[
                { label:'Add comment before', action : 'commentBefore' },
                { label:'Add Comment After', action : 'commentAfter'},
                { label:'Grade', children:[
                    { icon:'', label:chess.language.clear, action:'grade' },
                    { icon:'!', label:chess.language.goodMove, action:'grade' },
                    { icon:'?', label:chess.language.poorMove, action:'grade' },
                    { icon:'!!', label:chess.language.veryGoodMove, action:'grade' },
                    { icon:'??', label:chess.language.veryPoorMove, action:'grade' },
                    { icon:'?!', label:chess.language.questionableMove, action:'grade' },
                    { icon:'!?', label:chess.language.speculativeMove, action:'grade' }
                ]},
                { label:'Delete remaining moves'}
            ]
        };
    },
    ludoEvents:function () {
        this.getBody().addEvent('click', this.clickOnMove.bind(this));
    },

    ludoDOM:function () {
        this.parent();
        this.getEl().addClass('chess-notation-panel');
    },

    setContextMenuMove:function (el) {
        this.contextMenuMove = { id:el.getProperty('moveId')}
    },

    getContextMenuMove:function () {
        return this.contextMenuMove;
    },

    clickOnMove:function (e) {
        if (e.target.hasClass('notation-chess-move')) {
            this.fireEvent('setCurrentMove', { id:e.target.getProperty('moveId')});
            this.highlightMove(e.target);
        }
    },
    goToStartOfBranch:function () {
        this.clearHighlightedMove();
    },

    setCurrentMove:function (model) {
        var move = model.getCurrentMove();

        if (move) {
            this.highlightMove($(this.moveMapNotation[move.id]));
        } else {
            this.clearHighlightedMove();
        }
    },
    highlightMove:function (move) {
        this.clearHighlightedMove();

        move.addClass('notation-chess-move-highlighted');

        this.highlightedMove = move.id;
        this.scrollMoveIntoView(move);
    },

    clearHighlightedMove:function () {
        var el;
        if (el = document.getElementById(this.highlightedMove)) {
            el.removeClass('notation-chess-move-highlighted');

        }
    },

    scrollMoveIntoView:function (move) {
        var scrollTop = this.getBody().scrollTop;
        var bottomOfScroll = scrollTop + this.getBody().clientHeight;

        if ((move.offsetTop + 40) > bottomOfScroll) {
            this.getBody().scrollTop = scrollTop + 40;
        } else if (move.offsetTop < scrollTop) {
            this.getBody().scrollTop = move.offsetTop - 5;
        }
    },

    showMoves:function (model) {
        this.getBody().set('html', '');
        var moves = this.getMovesInBranch(model.getMoves(), 0, 0, 0, 0);
        this.getBody().set('html', moves.join(' '))
    },

    getMovesInBranch:function (branch, moveCounter, depth, branchIndex, countBranches) {
        var moves = [];

        moves.push('<span class="notation-branch-depth-' + depth + '">');
        if (depth) {
            switch (depth) {
                case 1:
                    if (branchIndex === 0) {
                        moves.push('[');
                    }
                    break;
                default:
                    moves.push('(');
            }
        }
        moves.push('<span class="notation-branch">');
        for (var i = 0; i < branch.length; i++) {
            var notation = branch[i][this.notationKey];
            if (i == 0 && moveCounter % 2 != 0 && notation) {
                moves.push('..' + Math.ceil(moveCounter / 2));
            }
            if (moveCounter % 2 === 0 && notation) {
                var moveNumber = (moveCounter / 2) + 1;
                moves.push(moveNumber + '. ');
            }
            if (notation) {
                moveCounter++;
            }
            var id = branch[i].id;
            this.currentMoveIndex++;
            moves.push('<span class="chess-move-container-' + branch[i].id + '">');
            moves.push(this.getDomTextForAMove(branch[i], id));
            moves.push('</span>');
            if (branch[i].variations && branch[i].variations.length > 0) {
                for (var j = 0; j < branch[i].variations.length; j++) {
                    if (branch[i].variations[j].length > 0) {
                        moves.push(this.getMovesInBranch(branch[i].variations[j], moveCounter - 1, depth + 1, j, branch[i].variations.length).join(' '));
                    }
                }
            }
        }
        moves.push('</span>');
        if (depth) {
            switch (depth) {
                case 1:
                    if (branchIndex == countBranches - 1) {
                        moves.push(']');
                    }
                    break;
                default:
                    moves.push(')');
            }
        }
        moves.push('</span>');
        return moves;
    },

    getDomTextForAMove:function (move) {
        var ret = [];

        ret.push('<span id="' + move.id + '" class="notation-chess-move-c ' + move.id + '" moveId="' + move.id + '">');
        if (move[this.notationKey]) {
            ret.push('<span id="move-' + move.id + '" class="notation-chess-move chess-move-' + move.id + '" moveId="' + move.id + '">' + move[this.notationKey] + '</span>');
        }
        if (move.comment) {
            ret.push('<span class="notation-comment">' + move.comment + '</span>')
        }
        ret.push('</span>');

        this.moveMap[move.id] = move.id;
        this.moveMapNotation[move.id] = 'move-' + move.id;

        return ret.join(' ');
    },


    updateMove:function (model, move) {
        var domEl = this.getEl().getElement('.chess-move-container-' + move.id);
        if(domEl){
            domEl.set('html', this.getDomTextForAMove(move));
        }else{
            this.showMoves(model);
        }
        this.setCurrentMove(model);
    },

    appendMove:function (model, move) {

        var previousMove = model.getPreviousMoveInBranch(move);
        if (previousMove) {
            var branch = this.getDomBranch(previousMove);
            var id = this.moveIdPrefix + this.currentMoveIndex;
            this.currentMoveIndex++;

            var moveString = '';
            var moveCounter = model.getBranch(move).length - 1 || 0;
            if (moveCounter % 2 === 0 && moveCounter > 0) {
                var moveNumber = (moveCounter / 2) + 1;
                moveString = moveNumber + '. ';
            }
            moveString += this.getDomTextForAMove(move, id);
            branch.set('html', branch.get('html') + moveString);

        } else {
            this.showMoves(model);
        }
        this.setCurrentMove(model);
    },

    getDomBranch:function (move) {
        var domEl = $(this.moveMap[move.id]);
        return domEl.getParent('.notation-branch');
    },

    getFirstBranch:function () {
        return this.getBody().getElement('.notation-branch');
    }
});