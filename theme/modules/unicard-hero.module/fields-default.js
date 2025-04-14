import { globalDefault } from '../unicard-global-default.js'
import { groupGlobalDefault } from '../unicard-group-global-default.js'
export const card1 = {
  accordion_group: groupGlobalDefault.accordion_group,
  button_group: groupGlobalDefault.button_group,
  form_group: groupGlobalDefault.form_group,
  full_width_image_group: groupGlobalDefault.full_width_image_group,
  heading: groupGlobalDefault.heading,
  icon_group: groupGlobalDefault.icon_group,
  lottie_group: groupGlobalDefault.lottie_group,
  subheading: groupGlobalDefault.subheading,
  video_group: groupGlobalDefault.video_group,
  simple_image_group: {
    simple_image: {
      alt: "HubSpot_Logo",
      height: 351,
      src: globalDefault.hubspotLogo,
      width: 1200
    },
    simple_image_width: 350
  },
  module_components: ["media"],
  media_type: "simple_image",
}

export const card2 = {
  accordion_group: groupGlobalDefault.accordion_group,
  button_group: groupGlobalDefault.button_group,
  form_group: groupGlobalDefault.form_group,
  full_width_image_group: groupGlobalDefault.full_width_image_group,
  icon_group: groupGlobalDefault.icon_group,
  lottie_group: groupGlobalDefault.lottie_group,
  subheading: groupGlobalDefault.subheading,
  video_group: groupGlobalDefault.video_group,
  simple_image_group: {
    simple_image: {
      alt: "OperationsHub_Icon_Gradient_RGB_24px",
      height: 31,
      src: globalDefault.contentHubIcon,
      width: 30
    },
    simple_image_width: 50
  },
  heading: {
    heading_icon_position: "left",
    heading_style: "display-6",
    heading_tag: "h2",
    heading_text: "Content Marketing Software That\nGrows With You",
    heading_text_prop_visibility: false
  },
  richtext: "<p style=\"font-size: 20px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non nunc dapibus, vestibulum urna eu, pretium mauris. Ut suscipit augue eget lacus elementum, ut vestibulum lectus ornare. Morbi placerat felis ante, ut ultrices nunc dictum dapibus.</p>",
  module_components: ["media", "main_heading", "richtext"],
  media_type: "simple_image",
}
