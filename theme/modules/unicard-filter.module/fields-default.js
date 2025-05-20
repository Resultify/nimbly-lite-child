import { globalDefault } from '../unicard-global-default.js'
import { groupGlobalDefault } from '../unicard-group-global-default.js'
import { categoryList } from '../../partials/data/category-list.js'

export const card1 = {
  accordion_group: groupGlobalDefault.accordion_group,
  button_group: groupGlobalDefault.button_group,
  form_group: groupGlobalDefault.form_group,
  full_width_image_group: groupGlobalDefault.full_width_image_group,
  simple_image_group: groupGlobalDefault.simple_image_group,
  subheading: groupGlobalDefault.subheading,
  lottie_group: groupGlobalDefault.lottie_group,
  video_group: groupGlobalDefault.video_group,
  icon_group: {
    icon: {
      name: "align-left",
      type: "SOLID",
      unicode: "f036"
    },
    icon_size: 100,
    icon_type: "fontawesome"
  },
  custom_text_group: [ {
    custom_text: "RESPONSIVE",
    custom_text_background: { },
    custom_text_inline: true,
    gradient_color: [ {
      color: "#999999",
      opacity: 100
    }, {
      color: "#999999",
      opacity: 100
    } ]
  } ],
  heading: {
    heading_additional_customization: true,
    heading_icon_position: "left",
    heading_link: {
      no_follow: false,
      open_in_new_tab: false,
      sponsored: false,
      url: {
        href: "#test",
        type: "EXTERNAL"
      },
      user_generated_content: false
    },
    heading_link_color: {
      color: "#134F5C",
      opacity: 100
    },
    heading_link_hover_color: {
      color: "#20124D",
      opacity: 100
    },
    heading_link_type: "link",
    heading_tag: "h2",
    heading_text: "Unicard will automatically adjust for different screen sizes and viewports.",
    heading_text_prop_visibility: false
  },
  media_type: "icon",
  module_components: [ "media", "separator", "custom_text", "main_heading", "categories" ],
  whole_area_link: true,
  category_group: [ categoryList[0][0] ],
}

export const card2 = {
  accordion_group: groupGlobalDefault.accordion_group,
  button_group: groupGlobalDefault.button_group,
  form_group: groupGlobalDefault.form_group,
  simple_image_group: groupGlobalDefault.simple_image_group,
  subheading: groupGlobalDefault.subheading,
  icon_group: groupGlobalDefault.icon_group,
  lottie_group: groupGlobalDefault.lottie_group,
  video_group: groupGlobalDefault.video_group,
  full_width_image_group: {
    force_full_width_image: true,
    full_width_image: {
      alt: "pexels-moose-photos-170195-1037995",
      height: 4016,
      max_height: 1335.1063829787233,
      max_width: 2000,
      size_type: "auto_custom_max",
      src: globalDefault.unicardImage,
      width: 6016
    },
    full_width_image_aspect_ratio: "16/9",
    full_width_image_opt_visibility: false
  },
  custom_text_group: [ {
    custom_text: "NO-CODE",
    custom_text_background: { },
    custom_text_inline: true,
    gradient_color: [ {
      color: "#999999",
      opacity: 100
    }, {
      color: "#999999",
      opacity: 100
    } ]
  } ],
  heading: {
    heading_additional_customization: true,
    heading_icon_position: "left",
    heading_link: {
      no_follow: false,
      open_in_new_tab: false,
      sponsored: false,
      url: {
        href: "#test",
        type: "EXTERNAL"
      },
      user_generated_content: false
    },
    heading_link_color: {
      color: "#000000",
      opacity: 100
    },
    heading_link_hover_color: {
      color: "#20124D",
      opacity: 100
    },
    heading_link_type: "link",
    heading_tag: "h2",
    heading_text: "Implement a custom card design without changing the code",
    heading_text_prop_visibility: false
  },
  media_type: "full_width_image",
  module_components: [ "media", "custom_text", "main_heading", "categories" ],
  whole_area_link: true,
  category_group: [ categoryList[0][1] ],
}

export const card3 = {
  accordion_group: groupGlobalDefault.accordion_group,
  form_group: groupGlobalDefault.form_group,
  full_width_image_group: groupGlobalDefault.full_width_image_group,
  simple_image_group: groupGlobalDefault.simple_image_group,
  subheading: groupGlobalDefault.subheading,
  icon_group: groupGlobalDefault.icon_group,
  lottie_group: groupGlobalDefault.lottie_group,
  video_group: groupGlobalDefault.video_group,
  heading: {
    heading_additional_customization: false,
    heading_icon_position: "left",
    heading_link: {
      no_follow: false,
      open_in_new_tab: false,
      sponsored: false,
      url: {
        href: "#test",
        type: "EXTERNAL"
      },
      "user_generated_content" : false
    },
    heading_link_color: {
      opacity: 100
    },
    heading_link_hover_color: {
      opacity: 100
    },
    heading_link_type: "link",
    heading_tag: "h2",
    heading_text: "The One Content Module for All Your Card Needs",
    heading_text_prop_visibility: false
  },
  richtext: `
  <p>Simplify your toolkit instantly with Unicard, giving you access to <strong>40+ design variations</strong> ready for <strong>No-Code implementation</strong> via an exceptionally <strong>editor-friendly UI.</strong></p>
  `,
  button_group: [ {
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
    button_text: "Explore",
    custom_button_background: {
      color: "#f9565f",
      opacity: 100
    },
    custom_button_border_color: {
      color: "#f9565f",
      opacity: 100
    },
    custom_button_border_radius: 10,
    custom_button_border_width: 2,
    custom_button_font: {
      color: "#FFFFFF",
    },
    custom_button_hover: {
      background: {
        color: "#FFFFFF",
        opacity: 0
      },
      border_color: {
        color: "#f9565f",
        opacity: 100
      },
      color: {
        color: "#f9565f",
        opacity: 100
      }
    },
    custom_link_color: { },
    custom_link_font: {
      font_set: "DEFAULT"
    },
    custom_link_hover: {
      color: { }
    }
  } ],
  media_type: "full_width_image",
  module_components: [ "separator", "main_heading", "richtext", "buttons", "categories" ],
  whole_area_link: false,
  category_group: [ categoryList[0][2] ],
  card_style: {
    background_size: "cover",
    background_alignment: "MIDDLE_CENTER",
    background_image: globalDefault.unicardBackground,
    background_image_overlay: {
      color: "#0C343D",
      opacity: 60
    },
    background_image_overlay_type: "color",
    background_type: "background_image",
    text_color: {
      color: "#FFFFFF",
      opacity: 100
    }
  },
}
