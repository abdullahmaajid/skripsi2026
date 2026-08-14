with open("src/app/(app)/dashboard/DashboardClient.tsx", "r") as f:
    content = f.read()

# Replace the extra closing tags
content = content.replace("      </motion.div>\n\n      </motion.div>\n    </motion.div>\n  )\n}", "      </motion.div>\n    </motion.div>\n  )\n}")

with open("src/app/(app)/dashboard/DashboardClient.tsx", "w") as f:
    f.write(content)

