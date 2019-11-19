const mongoose = require('mongoose');
const moment =require('moment');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// 虚拟属性'name'：表示作者全名
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });
//虚拟属性date_of_birth_n
AuthorSchema
  .virtual('date_of_birth_n')
  .get(function () {
    return moment(this.date_of_birth).format('MMMM Do, YYYY');
  });
//虚拟属性date_of_death_n
AuthorSchema
  .virtual('date_of_death_n')
  .get(function () {
    return moment(this.date_of_death).format('MMMM Do, YYYY');
  });
// 虚拟属性'lifespan'：作者寿命
AuthorSchema
.virtual('lifespan')
.get(function () {
  var lifetime_string='';
  if (this.date_of_birth) {
      lifetime_string=moment(this.date_of_birth).format('MMMM Do, YYYY');
      }
  lifetime_string+=' - ';
  if (this.date_of_death) {
      lifetime_string+=moment(this.date_of_death).format('MMMM Do, YYYY');
      }
  return lifetime_string
});

// 虚拟属性'url'：作者 URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });

// 导出 Author 模型
module.exports = mongoose.model('Author', AuthorSchema);