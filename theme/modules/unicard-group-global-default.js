import { globalDefault } from "./unicard-global-default.js";
export const groupGlobalDefault = {
  accordion_group: {
    accordion_border_style: "border_divider",
    accordion_icon_position: "left",
    accordion_item: [ {
      accordion_item_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      accordion_item_title: "Heading 1"
    }, {
      accordion_item_text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      accordion_item_title: "Heading 2"
    } ],
    accordion_spacing_prop_visibility: false
  },
  button_group: [
    {
      button_alignment: "start",
      button_hide_text: false,
      button_icon: {
        type: "REGULAR"
      },
      button_icon_position: "left",
      button_image: {
        loading: "disabled",
        src: ""
      },
      button_link: {
        no_follow: false,
        open_in_new_tab: false,
        sponsored: false,
        url: {
          href: "#test",
          type: "EXTERNAL"
        },
        user_generated_content: false
      },
      button_position: "inline",
      button_size: "regular",
      button_style: "primary",
      button_text: "Primary",
      custom_button_background: { },
      custom_button_border_color: { },
      custom_button_font: {
        font_set: "DEFAULT"
      },
      custom_button_hover: {
        background: { },
        border_color: { },
        color: { }
      },
      custom_link_color: { },
      custom_link_font: {
        font_set: "DEFAULT"
      },
      custom_link_hover: {
        color: { }
      }
    }, {
      button_alignment: "start",
      button_hide_text: false,
      button_icon: {
        type: "REGULAR"
      },
      button_icon_position: "left",
      button_image: {
        loading: "disabled",
        src: ""
      },
      button_link: {
        no_follow: false,
        open_in_new_tab: false,
        sponsored: false,
        url: {
          href: "#test",
          type: "EXTERNAL"
        },
        user_generated_content: false
      },
      button_position: "inline",
      button_size: "regular",
      button_style: "secondary2",
      button_text: "Secondary",
      custom_button_background: { },
      custom_button_border_color: { },
      custom_button_font: {
        font_set: "DEFAULT"
      },
      custom_button_hover: {
        background: { },
        border_color: { },
        color: { }
      },
      custom_link_color: { },
      custom_link_font: {
        font_set: "DEFAULT"
      },
      custom_link_hover: {
        color: { }
      }
    }
  ],
  button_group_custom: [
    {
      button_alignment: "start",
      button_hide_text: false,
      button_icon: {
        type: "REGULAR"
      },
      button_icon_position: "left",
      button_image: {
        loading: "disabled",
        src: ""
      },
      button_link: {
        no_follow: false,
        open_in_new_tab: false,
        sponsored: false,
        url: {
          href: "#test",
          type: "EXTERNAL"
        },
        user_generated_content: false
      },
      button_position: "inline",
      button_size: "regular",
      button_style: "custombutton",
      button_text: "Button",
      custom_button_background: { },
      custom_button_border_color: { },
      custom_button_font: {
        font_set: "DEFAULT"
      },
      custom_button_hover: {
        background: { },
        border_color: { },
        color: { }
      },
      custom_link_color: { },
      custom_link_font: {
        font_set: "DEFAULT"
      },
      custom_link_hover: {
        color: { }
      }
    }
  ],
  form_group: {
    form_heading_tag: "h3"
  },
  full_width_image_group: {
    full_width_image: {
      src: globalDefault.unicardImage,
    },
    full_width_image_aspect_ratio: "16/9"
  },
  heading: {
    heading_icon_position: "left",
    heading_tag: "h2",
    heading_text: globalDefault.headingText,
  },
  icon_group: {
    icon: {
      name: 'address-card',
      type: 'REGULAR',
      unicode: "f2bb"
    },
    icon_size: 80,
    icon_type: "fontawesome"
  },
  lottie_group: {
    lottie_file: globalDefault.unicardLottie,
    lottie_loop: true,
    lottie_mode: "forward",
    lottie_speed: 1
  },
  media_type: "full_width_image",
  module_components: ["media"],
  simple_image_group: {
    simple_image: {
      src: globalDefault.contentHubIcon,
    },
  },
  subheading: {
    heading_icon_position: "left",
    heading_tag: "h3",
    heading_text: globalDefault.subheadingText
  },
  video_group: {
    embed: {
      oembed_response: {
        type: "video",
        html: `<iframe width="200" height="113" src="${globalDefault.unicardVideo.videoIframeUrl}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="What is HubSpot?"></iframe>`,
      },
      oembed_url: globalDefault.unicardVideo.videoUrl,
      source_type: "oembed"
    },
    video_type: "embed"
  }
};

