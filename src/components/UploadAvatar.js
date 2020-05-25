import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/Auth";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UploadAvatar extends Component {
  state = {
    loading: false,
    imageUrl: this.props.user.image,
  };

  search = (photo) => {
    axios
      .post(
        "http://localhost:5000/profile-picture",
        { photo },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        this.setState({ plants: response.data }, () => {
          this.props.history.push({
            pathname: "/search",
            state: { plants: this.state.plants },
          });
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="photo"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:5000/profile-picture"
        withCredentials="true"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
export default withAuth(UploadAvatar);