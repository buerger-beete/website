function getMailLink () {
    const subject = `👋 Ahoi! – Anmeldung Bürger:Beete`;
    const body = `Name: IHR_NAME\r\nAdresse: IHRE_ADRESSE\r\n`;

    return `mailto:info@buerger-beete.de?subject=${ encodeURIComponent(subject) }&body=${ encodeURIComponent(body) }`;
}

export { getMailLink };