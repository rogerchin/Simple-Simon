var simon = {
	level: 1,
	turn: 0,
	score: 0,
	active: false,
	handler: false,
	shape: '.shape',
	sequence: [],
	guess: [],


	initiate: function(){
		while(this.handler === false){
			this.initiateHandler();
		}
		this.newGame();
	},

	initiateHandler: function(){
		that=this;
		$('.pad').on('mouseup',function(){

			if(that.active === true){
				var pad=parseInt($(this).data('pad'),10);

				that.flash($(this),1,300, pad);

				that.logPlayerSequence(pad);
			}

		});
		this.handler=true;
	},

	newGame: function(){

		this.level=1;
		this.score=0;
		this.newLevel();
		this.displayLevel();
		this.displayScore();

	},

	newLevel: function(){
		
		this.sequence.length=0;
		this.guess.length=0;
		this.pos=0;
		this.turn=0;
		this.active=true;
		
		this.randomize(this.level); 
		this.displaySequence(); 

	},

	flash: function(element, times, speed, pad){

		var that = this;

		if(times > 0){
			element.stop().animate({opacity: '1'},{
				duration: 50,
				complete: function(){
					element.stop().animate({opacity: '0.6'}, 200);
				}
			});
		}
		
		if (times > 0) {
			setTimeout(function () {
				that.flash(element, times, speed, pad);
			}, speed);
			times -= 1;
		}
	},

	randomize: function(passes){

		for(i=0;i<passes;i++){
			this.sequence.push(Math.floor(Math.random()*4)+1);
		}
	},

	logPlayerSequence: function(pad){
		this.guess.push(pad);
		this.checkSequence(pad);
	},

	checkSequence: function(pad){
		that=this;
		if(pad !== this.sequence[this.turn]){
			this.incorrectSequence();
			}else{
			this.keepScore();
			this.turn++;
		}

		if(this.turn === this.sequence.length){
			this.level++;
			this.displayLevel();
			this.active=false;
			setTimeout(function(){
				that.newLevel();
			},1000);
		}
	},

	displaySequence: function(){
		var that=this;
		$.each(this.sequence, function(index, val){
			setTimeout(function(){
				that.flash($(that.shape+val),1,300,val);
			},500*index);
		});
	},

	displayLevel: function(){
		$('.level h2').text('Level: '+this.level);
	},

	displayScore: function(){
		$('.score h2').text('Score: '+this.score);
	},

	keepScore: function(){
		this.displayScore();
	},

	incorrectSequence: function(){
		var corPad = this.sequence[this.turn],

		that=this;
		this.active=false;
		this.displayLevel();
		this.displayScore();

		setTimeout(function(){
			that.flash($(that.shape+corPad),4,300,corPad);
		},500);

		$('.start').show();
		$('.difficulty').show();
	},
};

$(document).ready(function(){
	$('.start').on('mouseup', function(){
		simon.initiate();
	});
});






