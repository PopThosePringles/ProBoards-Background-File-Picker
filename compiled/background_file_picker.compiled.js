"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, null, [{
		key: "init",
		value: function init() {
			this.route = pb.data("route");

			this.update_bg();

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			if (this.route.name.match(/^edit_user_\w+/i)) {
				var $personal_form = $(".form_user_edit_personal");

				if ($personal_form.length == 1) {
					var html = "<div><label>Background</label><span class='description'>Pick a local image to display as the forum backgroud.  <br />This is private, no other member can see this background apart from you.</span><div class='bg-file-wrapper'><label class='bg-file-label button'><input type='file' id='bg-browse-file' /><span>Select Background</span></label> <button id='bg-clear-bg'>Clear Background</button></div></div>";

					$(html).insertBefore($personal_form.children().last());

					$("#bg-browse-file").on("change", this.file_change.bind(this));
					$("#bg-clear-bg").on("click", this.clear_bg.bind(this));
				}
			}
		}
	}, {
		key: "file_change",
		value: function file_change(event) {
			var _this = this;

			var reader = new FileReader();

			reader.onload = function (e) {
				var data = e.target.result;

				if (data) {
					localStorage.setItem("user-bg", data);
					_this.update_bg();
				}
			};

			if (event.target.files.length == 1) {
				if (event.target.files[0].type.match(/^image\/(jpe?g|png|bmp)$/i)) {
					reader.readAsDataURL(event.target.files[0]);
				}
			}
		}
	}, {
		key: "clear_bg",
		value: function clear_bg() {
			localStorage.setItem("user-bg", "");

			this.update_bg();
		}
	}, {
		key: "update_bg",
		value: function update_bg() {
			var data = localStorage.getItem("user-bg") || "";

			$("body").css("background-image", "url(" + data + ")");
		}
	}]);

	return _class;
})().init();
