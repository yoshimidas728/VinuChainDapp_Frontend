import '../css/blog.css'
export function HtmlRenderer({ htmlString }) {
    return <div className="blog-container" style={{display: "block",}}  width={["400px","100%","400px"]} dangerouslySetInnerHTML={{ __html: htmlString }} />;
}