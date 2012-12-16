chess.view.command.Controller = new Class({
	Extends:ludo.controller.Controller,
	type:'chess.view.command.Controller',
	singleton:true,
	useController:true,
	validCommands:['help', 'move', 'cls', 'fen','load','flip','grade','backward','forward'],
	module:'chess',
	submodule:'commandLine',
	addView:function (view) {
		view.addEvent('sendMessage', this.receiveMessage.bind(this));

	},

	receiveMessage:function (message) {
		if(!message)return;
		var command = this.getValidCommand(message);
		if (command) {
			this.execute(command, this.getCommandArguments(message));
		} else {
			this.errorMessage('Invalid command: "' + message + '"');
		}
	},

	addControllerEvents:function () {
		this.controller.addEvent('invalidMove', this.onInvalidMove.bind(this));
		this.controller.addEvent('newMove', this.receiveMove.bind(this));
		this.controller.addEvent('updateMove', this.receiveMoveUpdate.bind(this));
	},

	getValidCommand:function (command) {
		var c = command.split(/\s/)[0];
		if (this.validCommands.indexOf(c) !== -1)return c;
		if (this.isChessMove(command))return 'move';
		return undefined;
	},

	getCommandArguments:function (message) {
		var c = message.split(/\s/)[0];
		if (this.validCommands.indexOf(c) !== -1) {
			message = message.split(/\s/);
			message.splice(0, 1);
			return message.join(' ');
		}
		return message;
	},

	execute:function (command, arg) {
		switch (command) {
			case 'help':
				this.showHelp();
				break;
			case 'cls':
				this.fireEvent('clear');
				break;
			case 'load':
				if(!isNaN(arg)){
					this.fireEvent(command,{ id : arg });
				}else{
					this.errorMessage(chess.getPhrase('Invalid game') + ': ' + arg);
				}
				break;
			case 'grade':
				arg = arg || '';
				if(this.isValidGrade(arg)){
					this.fireEvent(command, arg);
				}else{
					this.errorMessage(chess.getPhrase('Invalid grade') + ': ' + arg);
				}
				break;
			case 'fen':
				try {
					this.fireEvent('setPosition', arg);
				} catch (e) {
					this.errorMessage(chess.getPhrase('Invalid position') + ': ' + arg);
				}
				break;
			default:
				this.fireEvent(command, arg);
		}

	},

	helpMessage:undefined,

	showHelp:function () {
		if (this.helpMessage === undefined) {
			var msg = [];
			for (var i = 0; i < this.validCommands.length; i++) {
				var c = this.validCommands[i];
				msg.push(['<span class="chess-command-help-label">', c, '</span>: ', chess.getPhrase('command_' + c)].join(''));
			}
			this.helpMessage = msg.join('<br>');
		}

		this.message(this.helpMessage);
	},

	onInvalidMove:function () {
		this.errorMessage(chess.getPhrase('Invalid move'));
	},

	isChessMove:function (move) {
		return /([PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:\=[PNBRQK])?|O(-?O){1,2})[\+#]?(\s*[\!\?]+)?/g.test(move)
	},
	receiveMove:function (controller, move) {
		this.message(chess.getPhrase('Moving') + ' ' + move.lm);
	},
	message:function (msg) {
		this.fireEvent('sendMessage', msg);
	},

	errorMessage:function (msg) {
		this.fireEvent('sendErrorMessage', msg);
	},

	isValidGrade:function(arg){
		return ['','?','??','!','!!','?!','!?'].indexOf(arg) !== -1;
	},

	receiveMoveUpdate:function(model, move){
		this.message(chess.getPhrase('Move updated to') + ': ' + move.lm);
	}
});