(class {

	static init(){
		this.PLUGIN_ID = "background_file_picker";
		this.route = pb.data("route");

		this.update_bg();

		$(this.ready.bind(this));
	}

	static ready(){
		if(this.route.name.match(/^edit_user_\w+/i)){
			let $personal_form = $(".form_user_edit_personal");

			if($personal_form.length == 1){
				let html = "<div><label>Background</label><span class='description'>Pick a local image to display as the forum backgroud.  <br />This is private, no other member can see this background apart from you.</span><div class='bg-file-wrapper'><label class='bg-file-label button'><input type='file' id='bg-browse-file' /><span>Select Background</span></label> <button id='bg-clear-bg'>Clear Background</button></div></div>";

				$(html).insertBefore($personal_form.children().last());

				$("#bg-browse-file").on("change", this.file_change.bind(this));
				$("#bg-clear-bg").on("click", this.clear_bg.bind(this));
			}
		}
	}

	static file_change(event){
		let reader = new FileReader();

		reader.onload = e => {
			let data = e.target.result;

			if(data){
				localStorage.setItem("user-bg", data);
				this.update_bg();
			}
		};

		if(event.target.files.length == 1){
			if(event.target.files[0].type.match(/^image\/(jpe?g|png|bmp)$/i)){
				reader.readAsDataURL(event.target.files[0]);
			}
		}
	}

	static clear_bg(){
		localStorage.setItem("user-bg", "");

		this.update_bg();
	}

	static update_bg(){
		let data = localStorage.getItem("user-bg") || "";

		$("body").css("background-image", "url(" + data + ")");
	}

}).init();

