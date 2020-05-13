const meta = {};

const noMatchboxImport = {
    meta,
    create(context) {
        const { report } = context;
        const filePath = context.getFilename();
        const withinSrc = /2web2ui\/src/.test(filePath);
        const withinSrcMatchboxComponents = /2web2ui\/src\/components\/matchbox/.test(filePath);

        return {
            "ImportDeclaration": function (node) {
                if (!withinSrc) {
                    return {};
                }

                if (!withinSrcMatchboxComponents && (/@sparkpost\/matchbox$/.test(node.source.value) || /@sparkpost\/matchbox-hibana$/.test(node.source.value))) {
                    report({
                        node: node,
                        message: "Do not allow direct matchbox imports."
                    });
                }
            },
        };
    },
};

module.exports = noMatchboxImport;
